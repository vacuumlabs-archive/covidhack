import {NextApiRequest, NextApiResponse} from 'next'
import {ValidationError} from 'yup'
import {ensureAuthentication} from '../../utils/auth'
import {client} from '../../utils/gql'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!ensureAuthentication(req, res)) return

  try {
    await client.DeleteGridMutation({id: req.body.id})
    res.status(201).end()
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
