const crypto = require('crypto')

const encryptPsw = (password) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')

  return {
    hash,
    salt
  }
}

const comparePsw = async (password, hash, salt) => {
  const hashPassword = await crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')

  return hashPassword === hash
}

const encryptFileName = (fileName) => {
  const nameToHash = fileName + Date.now()

  const salt = crypto.randomBytes(8).toString('hex')

  const hash = crypto.pbkdf2Sync(nameToHash, salt, 100, 25, 'sha512').toString('hex')

  if (fileName.includes('.png')) {
    return `${hash}.png`
  }
  if (fileName.includes('.jpg')) {
    return `${hash}.jpg`
  }
  if (fileName.includes('.gif')) {
    return `${hash}.gif`
  }
}

module.exports = {
  encryptPsw,
  comparePsw,
  encryptFileName
}
