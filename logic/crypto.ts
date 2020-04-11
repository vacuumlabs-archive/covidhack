const encode = (str: string) => new TextEncoder().encode(str)

const decode = (data: ArrayBuffer) => new TextDecoder().decode(data)

let SALT
const getSalt = () => {
  if (SALT) return SALT
  else return (SALT = crypto.getRandomValues(new Uint8Array(16)))
}

// https://medium.com/coinmonks/fun-times-with-webcrypto-part-1-pbkdf2-815b1c978c9d
async function getDerivation(password: string): Promise<ArrayBuffer> {
  const passwordBuffer = encode(password)
  const importedKey = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, [
    'deriveBits',
  ])

  const params = {name: 'PBKDF2', hash: 'SHA-256', salt: getSalt(), iterations: 4096}
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

export const encrypt = async (data: string, pass: string) => {
  const {iv, key} = await getDerivedKey(await getDerivation(pass))

  return await crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    key,
    encode(data),
  )
}

export const decrypt = async (data: ArrayBuffer, pass: string) => {
  const {iv, key} = await getDerivedKey(await getDerivation(pass))

  return decode(
    await crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: iv,
      },
      key,
      data,
    ),
  )
}
