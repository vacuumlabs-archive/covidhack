import {NextApiRequest, NextApiResponse} from 'next'
import {allowAccessFor} from '../../utils/auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!allowAccessFor(req.headers.authorization, ['kancelaria', 'laboratorium'])) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic')
    res.end('Unauthorized')
  }

  // TODO all of this

  res.status(201).end()
}
