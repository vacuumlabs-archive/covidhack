// update single cell of the grid
import {NextApiRequest, NextApiResponse} from 'next'
import {ensureAuthentication} from '../../utils/auth'
import {client} from '../../utils/gql'
import {updateLabResultBodySchema} from '../../utils/validations'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!ensureAuthentication(req, res)) return

  const validBody = updateLabResultBodySchema.validateSync(req.body, {stripUnknown: true})
  // some manual validation as yup's oneOf does not work that great with typescript
  // the idea is that we expect to update either 'positive' or 'sampleCode', never both
  if (validBody.positive !== undefined && validBody.sampleCode !== undefined) {
    return res.status(400).end()
  } else if (typeof validBody.positive === 'boolean') {
    const a = await client.UpdateLabResultPositiveMutation(validBody)
    // return the grid query to use for updating local cache
    const result = await client.GridWithLabResultsQuery({id: validBody.gridId})

    res.end(JSON.stringify(result))
  } else if (validBody.sampleCode !== undefined) {
    await client.UpdateLabResultSampleCodeMutation(validBody)
    // return the grid query to use for updating local cache
    const result = await client.GridWithLabResultsQuery({id: validBody.gridId})
    res.end(JSON.stringify(result))
  } else {
    return res.status(400).end()
  }
}
