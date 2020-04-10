// update whole-grid meta-data - title, dates, finished..
import {NextApiRequest, NextApiResponse} from 'next'
import {allowAccessFor} from '../../utils/auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!allowAccessFor(req.headers.authorization, ['kancelaria', 'laboratorium'])) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic')
    res.end('Unauthorized')
  }

  //TODO validate
  const {
    title,
    test_initiation_date,
    test_finished_date,
    sample_taken_date,
    sample_arrival_date,
  } = req.body
  //TODO set finished
  res.status(201).end()
}
