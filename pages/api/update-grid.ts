// update whole-grid meta-data - title, dates, finished..
import formatISO from 'date-fns/formatISO'
import {NextApiRequest, NextApiResponse} from 'next'
import {ValidationError} from 'yup'
import {allowAccessFor} from '../../utils/auth'
import {client} from '../../utils/gql'
import {updateGridBodySchema} from '../../utils/validations'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!allowAccessFor(req.headers.authorization, ['kancelaria', 'laboratorium'])) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic')
    res.end('Unauthorized')
  }
  try {
    const gridId = req.body.id
    if (!gridId) return res.status(400).end()

    const currentGrid = await client.GridQuery({id: gridId})
    if (!currentGrid.grid_by_pk.id) return res.status(400).end()

    // id is stripped from validBody
    let validBody = updateGridBodySchema.validateSync(req.body, {stripUnknown: true})

    // set lab results finished date if not set yet
    if (validBody.finished && !currentGrid.grid_by_pk.test_finished_date) {
      validBody = {...validBody, test_finished_date: formatISO(Date.now())}
    }

    await client.UpdateGridMutation({id: gridId, changes: validBody})
    // return the grid query to use for updating local cache (nice-to-have & optional, we can just refetch after success)
    const result = await client.GridWithLabResultsQuery({id: gridId})
    res.end(JSON.stringify(result))
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
