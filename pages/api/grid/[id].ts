// update single cell of the grid
import {NextApiRequest, NextApiResponse} from 'next'
import {allowAccessFor} from '../../../utils/auth'
import {client} from '../../../utils/gql'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!allowAccessFor(req.headers.authorization, ['laboratorium'])) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic')
    res.end('Unauthorized')
    return
  }

  const {
    query: {id},
  } = req

  if (typeof id !== 'string') return res.status(400).end()

  const result = await client.GridWithLabResultsQuery({id: id})
  if (result.grid_by_pk.id) {
    res.end(JSON.stringify(result))
  } else {
    res.status(404).end()
  }
}
