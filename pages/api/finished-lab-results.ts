// update single cell of the grid
import {NextApiRequest, NextApiResponse} from 'next'
import {ensureAuthentication} from '../../utils/auth'
import {client} from '../../utils/gql'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!ensureAuthentication(req, res)) return

  const gridResults = await client.FinishedGridsQuery()

  const ids = gridResults.grid.map((g) => g.id)

  const result = await client.FinishedLabResultQuery({gridIds: ids})
  res.end(JSON.stringify(result.lab_result))
}
