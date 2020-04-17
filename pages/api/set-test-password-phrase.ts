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
    await client.InsertEncryptedTestPhrase({
      test_phrase: req.body.encryptedTestPhrase,
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
