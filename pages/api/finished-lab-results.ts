// update single cell of the grid
import {NextApiRequest, NextApiResponse} from 'next'
import {allowAccessFor} from '../../utils/auth'
import {client} from '../../utils/gql'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!allowAccessFor(req.headers.authorization, ['kancelaria'])) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic')
    res.end('Unauthorized')
    return
  }

  const gridResults = await client.FinishedGridsQuery()

  const ids = gridResults.grid.map((g) => g.id)

  const result = await client.FinishedLabResultQuery({gridIds: ids})
  res.end(JSON.stringify(result.lab_result))
}
