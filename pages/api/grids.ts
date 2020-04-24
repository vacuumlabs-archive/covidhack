// update single cell of the grid
import {NextApiRequest, NextApiResponse} from 'next'
import {ensureAuthentication} from '../../utils/auth'
import {client} from '../../utils/gql'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!ensureAuthentication(req, res)) return

  const result = await client.GridsQuery()
  res.end(JSON.stringify(result.grid))
}
