// this is the admin-only download endpoint

import {NextApiRequest, NextApiResponse} from 'next'
import {downloadFile} from '../../utils/aws'
import {isHasuraAdminHeaderPresent} from '../../utils/backendHelper'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isHasuraAdminHeaderPresent(req)) return res.status(401).end('Unauthorized')

  const {key} = req.query
  if (typeof key !== 'string') return res.status(400).end()
  // get filename from key, expect file not to be saved in the root of the bucket
  const filename = key.includes('/') && key.split('/').reverse()[0]
  if (!filename) return res.status(400).end()

  const readStream = await downloadFile(key)
  readStream.pipe(res)
  res.setHeader('Content-Type', 'application/octet-stream')
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
}
