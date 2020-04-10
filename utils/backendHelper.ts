import formidable from 'formidable'
import {NextApiRequest} from 'next'

// there are limits to next.js code-splitting, and it can't handle
// requiring some files on both api routes and frontend

// both local and PR Review Apps
export const isDevelopment = () =>
  process.env.NODE_ENV === 'development' || process.env.HEROKU_PR_NUMBER

export const isHasuraAdminHeaderPresent = (req: NextApiRequest) => {
  // note - all header names are lowercased by next.js
  return req.headers['x-hasura-admin-secret'] === process.env.HASURA_ADMIN_SECRET
}

// promise wrapper for formidable.parse, forcing types as typescript (resonably) does not trust formidable
export const formidablePromise = (req, opts) => {
  return new Promise(function(resolve, reject) {
    const form = new formidable.IncomingForm(opts)
    form.parse(req, function(err, fields, files) {
      if (err) return reject(err)
      resolve({fields: fields, files: files})
    })
  }) as Promise<{fields: formidable.Fields; files: formidable.Files}>
}

// https://stackoverflow.com/a/49428486
export const streamToBuffer = (stream) => {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}
