import _ from 'lodash'
// TODO get this from env
const credentials = {
  kancelaria: `Basic ${Buffer.from('kancelaria:theoffice2020').toString('base64')}`,
  laboratorium: `Basic ${Buffer.from('laboratorium:bigbangtheory2020').toString('base64')}`,
}

type Username = keyof typeof credentials

export const allowAccessFor = (authstring: string | undefined, allowed: Username[]) => {
  if (!authstring) return false
  const allowedCredentials = _.pick(credentials, allowed)
  return _.some(allowedCredentials, (pw) => pw === authstring)
}
