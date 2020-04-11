// update single cell of the grid
import {NextApiRequest, NextApiResponse} from 'next'
import {allowAccessFor} from '../../utils/auth'
import {updatePositiveSampleBodySchema} from '../../utils/validations'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!allowAccessFor(req.headers.authorization, ['kancelaria', 'laboratorium'])) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic')
    res.end('Unauthorized')
  }

  const validBody = updatePositiveSampleBodySchema.validateSync(req.body)

  // continue here mutation

  // TODO
  res.status(201).end()
}
