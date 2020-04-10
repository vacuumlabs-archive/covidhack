import {NextApiRequest, NextApiResponse} from 'next'
import {ValidationError} from 'yup'
import {isHasuraAdminHeaderPresent} from '../../utils/backendHelper'
import {sendEmail} from '../../utils/emails'
import {client} from '../../utils/gql'
import {sendVerificationEmailRequestBodySchema} from '../../utils/validations'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isHasuraAdminHeaderPresent(req)) return res.status(401).end('Unauthorized')
  try {
    const validBody = await sendVerificationEmailRequestBodySchema.validate(req.body)
    const data = await client.VerificationEmailRequestQuery({id: validBody.id})
    const receiver = data.verification_request[0].email
    if (validBody.status == 'approved') {
      await sendEmail(receiver, validBody.status, {
        name: `${data.verification_request[0].first_name} ${data.verification_request[0].last_name}`,
        registrationLink: `https://tramatm.com/registration-request/${validBody.id}`,
      })
    } else {
      await sendEmail(receiver, validBody.status, {
        name: `${data.verification_request[0].first_name} ${data.verification_request[0].last_name}`,
      })
    }
    await client.UpdateVerificationRequestStatusMutation({
      id: validBody.id,
      status: validBody.status,
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
