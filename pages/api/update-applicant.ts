import {NextApiRequest, NextApiResponse} from 'next'
import {ValidationError} from 'yup'
import {allowAccessFor} from '../../utils/auth'
import {client} from '../../utils/gql'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!allowAccessFor(req.headers.authorization, ['kancelaria'])) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic')
    res.end('Unauthorized')
  }

  try {
    // TODO: validation
    const application = {
      id: req.body.id,
      pacient_name: req.body.pacient,
      personal_number: req.body.personalNumber,
      sample_code: req.body.sampleCode,
      sample_collection_date: req.body.sampleCollectionDate,
      sample_receive_date: req.body.sampleReceiveDate,
      sender: req.body.sender,
    } as any

    // TODO here we can check for specific conflicts, before just upserting
    await client.UpdateApplicationMutation({
      id: application.id,
      changes: application,
    })
    res.status(201).end()
  } catch (e) {
    if (e instanceof ValidationError) {
      console.error(e)
      // TODO: at this point, we would want to send why we failed the validation as well
      res.status(400).end()
    } else {
      console.error(e)
      res.status(500).end()
    }
  }
}
