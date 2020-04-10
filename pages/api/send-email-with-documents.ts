import {NextApiRequest, NextApiResponse} from 'next'
import {ValidationError} from 'yup'
import {downloadFileBase64} from '../../utils/aws'
import {isHasuraAdminHeaderPresent} from '../../utils/backendHelper'
import {sendEmail} from '../../utils/emails'
import {client} from '../../utils/gql'
import {registrationIdRequestBodySchema} from '../../utils/validations'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isHasuraAdminHeaderPresent(req)) return res.status(401).end('Unauthorized')
  try {
    const validBody = await registrationIdRequestBodySchema.validate(req.body)
    const registration = await client.RegistrationRequestQuery({id: validBody.id})
    const verification = await client.VerificationEmailRequestQuery({
      id: registration.registration_request_by_pk.verification_request_id,
    })

    const delegation = await downloadFileBase64(`upload/generated/${validBody.id}_delegation.pdf`)
    const invoice = await downloadFileBase64(`upload/generated/${validBody.id}_invoice.pdf`)

    const receiver = registration.registration_request_by_pk.contact_email

    await sendEmail(
      receiver,
      'documents-generated',
      {
        name: `${verification.verification_request[0].first_name} ${verification.verification_request[0].last_name}`,
      },
      [
        {filename: `${validBody.id}_delegation.pdf`, content: delegation},
        {filename: `${validBody.id}_invoice.pdf`, content: invoice},
      ],
    )
    await client.UpdateRegistrationRequestStatusMutation({
      id: validBody.id,
      status: 'documents-sent',
    })

    res.status(200).end()
  } catch (e) {
    if (e instanceof ValidationError) {
      console.error(e)
      // at this point, we would want to send why we failed the validation as well
      res.status(400).end()
    } else {
      console.error(e)
      res.status(500).end('Unauthorized')
    }
  }
}
