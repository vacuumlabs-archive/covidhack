import {NextApiRequest, NextApiResponse} from 'next'
import {v4} from 'uuid'
import {ValidationError} from 'yup'
import {allowAccessFor} from '../../utils/auth'
import {client} from '../../utils/gql'
import {getSampleCodesFromGrid} from '../../utils/helpers'
import {createGridBodySchema} from '../../utils/validations'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!allowAccessFor(req.headers.authorization, ['kancelaria', 'laboratorium'])) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic')
    res.end('Unauthorized')
  }
  try {
    // TODO all of this
    const validBody = {
      ...createGridBodySchema.validateSync(req.body),
      id: v4(),
    }
    const applicationsFromCodes = getSampleCodesFromGrid(validBody.grid).map((v) => ({
      id: v4(),
      referenced_in_grid_id: validBody.id,
      sample_code: v,
    }))
    // TODO here we can check for specific conflicts, before just upserting
    await client.InsertGridMutation({
      gridObjects: [validBody],
      applicationsObjects: applicationsFromCodes,
    })
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
