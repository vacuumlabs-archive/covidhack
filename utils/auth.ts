import {IncomingMessage, ServerResponse} from 'http'

const isCorrectBasicAuth = (authstring: string | undefined) => {
  const {BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD} = process.env
  const joinedBasicAuth = `${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`
  const validAuthString = `Basic ${Buffer.from(joinedBasicAuth).toString('base64')}`

  return authstring === validAuthString
}

const sendUnauthorizedResponse = (res: ServerResponse): false => {
  res.statusCode = 401
  res.setHeader('WWW-Authenticate', 'Basic')
  res.end('Unauthorized')
  return false
}

export const ensureAuthentication = (req: IncomingMessage, res: ServerResponse): boolean => {
  const {BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD, SKIP_BASIC_AUTH} = process.env

  if (SKIP_BASIC_AUTH === 'true') return true
  else if (BASIC_AUTH_USERNAME === undefined || BASIC_AUTH_PASSWORD === undefined) {
    console.error(
      'Basic auth is not skipped, but there are no basic auth variables in process.env!',
    )
    return sendUnauthorizedResponse(res)
  } else if (!isCorrectBasicAuth(req.headers.authorization)) {
    return sendUnauthorizedResponse(res)
  }
  return true
}
