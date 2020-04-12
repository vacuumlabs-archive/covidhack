// update single cell of the grid
import {NextApiRequest, NextApiResponse} from 'next'
import {allowAccessFor} from '../../utils/auth'
import {client} from '../../utils/gql'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!allowAccessFor(req.headers.authorization, ['kancelaria', 'laboratorium'])) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic')
    res.end('Unauthorized')
    return
  }

  const result = await client.ApplicationsQuery()
  res.end(JSON.stringify(result.application))
}
