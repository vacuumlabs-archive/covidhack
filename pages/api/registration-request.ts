import {NextApiRequest, NextApiResponse} from 'next'
import {ValidationError} from 'yup'
import {client} from '../../utils/gql'
import {
  omitAgreementFields,
  omitExtraRegistrationFields,
  registrationRequestBodySchema,
} from '../../utils/validations'
import {sendEmail} from '../../utils/emails'
import {generateRegistrationDocuments} from '../../utils/pdf'
import {downloadFileBase64} from '../../utils/aws'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const validBody = await registrationRequestBodySchema.validate(req.body)
    const trimmedBody = omitExtraRegistrationFields(omitAgreementFields(validBody))
    // verify that valid verification request exists before allowing to proceed
    const verificationRequest = await client.VerificationRequestQuery({
      id: trimmedBody.verification_request_id,
    })
    if (verificationRequest.verification_request_by_pk.status !== 'approved') {
      console.error('Trying to register with an invalid verification request, aborting')
      res.status(400).end()
      return
    }
    const data = await client.InsertRegistrationRequestMutation({objects: [trimmedBody]})
    const registration = await client.RegistrationRequestQuery({
      id: data.insert_registration_request.returning[0].id,
    })
    if (verificationRequest.verification_request_by_pk.category !== 'international') {
      await generateRegistrationDocuments(
        verificationRequest.verification_request_by_pk,
        registration.registration_request_by_pk,
      )

      const delegation = await downloadFileBase64(
        `upload/generated/${data.insert_registration_request.returning[0].id}_delegation.pdf`,
      )
      const invoice = await downloadFileBase64(
        `upload/generated/${data.insert_registration_request.returning[0].id}_invoice.pdf`,
      )

      const receiver = data.insert_registration_request.returning[0].contact_email
      await sendEmail(
        receiver,
        'order-requested',
        {
          name: `${trimmedBody.contact_first_name} ${trimmedBody.contact_last_name}`,
        },
        [
          {filename: `Splnomocnenie.pdf`, content: delegation},
          {filename: `Faktúra.pdf`, content: invoice},
        ],
      )
    }

    await client.UpdateRegistrationRequestStatusMutation({
      id: data.insert_registration_request.returning[0].id,
      status: 'documents-sent',
    })
    res.status(200).json({id: data.insert_registration_request.returning[0].id})
  } catch (e) {
    if (e instanceof ValidationError) {
      console.error(e)
      // at this point, we would want to send why we failed the validation as well
      res.status(400).end()
    } else {
      console.error(e)
      res.status(500).end()
    }
  }
}
