const encode = (str: string) => new TextEncoder().encode(str)

const decode = (data: ArrayBuffer) => new TextDecoder().decode(data)

// we have SALT as constant, not optimal, but not a disaster.
const SALT = new Uint8Array(16)

// https://medium.com/coinmonks/fun-times-with-webcrypto-part-1-pbkdf2-815b1c978c9d
async function getDerivation(password: string): Promise<ArrayBuffer> {
  const passwordBuffer = encode(password)
  const importedKey = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, [
    'deriveBits',
  ])

  const params = {name: 'PBKDF2', hash: 'SHA-256', salt: SALT, iterations: 4096}
  const derivation = await crypto.subtle.deriveBits(params, importedKey, 48 * 8)
  return derivation
}

// https://medium.com/perimeterx/fun-times-with-webcrypto-part-2-encrypting-decrypting-dfb9fadba5bc
async function getDerivedKey(derivation: ArrayBuffer) {
  const keylen = 32
  const derivedKey = derivation.slice(0, keylen)
  // iv length is 16
  const iv = derivation.slice(keylen)
  const importedEncryptionKey = await crypto.subtle.importKey(
    'raw',
    derivedKey,
    {name: 'AES-CBC', length: keylen},
    false,
    ['encrypt', 'decrypt'],
  )
  return {
    key: importedEncryptionKey,
    iv: iv,
  }
}

// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
// but we use Uint8array to preserve utf-8 encoding
export function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf))
}

export function str2ab(str) {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

export const encrypt = async (data: string, pass: string): Promise<string> => {
  const {iv, key} = await getDerivedKey(await getDerivation(pass))

  return ab2str(
    await crypto.subtle.encrypt(
      {
        name: 'AES-CBC',
        iv: iv,
      },
      key,
      encode(data),
    ),
  )
}

export const decrypt = async (data: string, pass: string): Promise<string> => {
  const {iv, key} = await getDerivedKey(await getDerivation(pass))

  return decode(
    await crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: iv,
      },
      key,
      str2ab(data),
    ),
  )
}
