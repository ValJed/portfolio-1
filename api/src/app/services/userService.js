const userEntity = require('../../domain/User')

module.exports = ({
  userRepo,
  projectRepo,
  encrypt,
  sendMail,
  jwt,
  log
}) => {
  const findAll = async () => {
    const users = await userRepo.find()

    if (users && users.length) {
      return {
        success: true,
        users
      }
    }
    return {
      success: false,
      errors: ['No users found']
    }
  }

  const findByEmail = async (email) => {
    const user = await userRepo.findUserByEmail(email)

    if (user) {
      return {
        success: true
      }
    }
    return {
      success: false,
      error: 'No user found for this email'
    }
  }

  const create = async ({ username, email, password }) => {
    const existingUser = await userRepo.findByUsername(username)

    if (existingUser) {
      return {
        success: false,
        error: 'This email already match an account'
      }
    }

    const { hash, salt } = await encrypt.encryptPsw(password)

    const newUser = userEntity({ username, email, hash, salt })

    const res = await userRepo.create(newUser)

    if (res) {
      return {
        success: !!res.result.ok
      }
    }
  }

  const modify = async ({ username, psw, newUsername, newPsw }) => {
    if (!username.length || !psw.length) {
      return {
        success: false,
        error: 'Initial username and password should be provided'
      }
    }

    const user = await userRepo.findByUsername(username)

    if (!user) {
      return {
        success: false,
        error: 'No user found with this username'
      }
    }

    const isPasswordValid = await encrypt.comparePsw(
      psw,
      user.password.hash,
      user.password.salt
    )

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Password isn\'t valid'
      }
    }

    const password = !!newPsw.length && await encrypt.encryptPsw(newPsw)

    const newUser = {
      ...newUsername.length && { username: newUsername },
      ...password && { password }
    }

    const {
      lastErrorObject: { updatedExisting }
    } = await userRepo.updateUser(user._id, newUser)

    if (!updatedExisting) {
      return {
        success: false,
        error: 'Error when updating user in database'
      }
    }

    return {
      success: true
    }
  }

  const login = async ({ username, password }) => {
    const user = await userRepo.findByUsername(username)

    if (!user) {
      return {
        success: false,
        error: 'No user found with this username'
      }
    }

    const isPasswordValid = await encrypt.comparePsw(
      password,
      user.password.hash,
      user.password.salt
    )

    if (isPasswordValid) {
      const projects = await projectRepo.findAll()

      delete user.password

      return {
        success: true,
        token: jwt.signin(user._id),
        projects,
        user
      }
    }

    return {
      success: false,
      error: 'Password isn\'t valid'
    }
  }

  const verify = (token) => {
    const isTokenValid = jwt.verify(token)

    return {
      success: !!isTokenValid
    }
  }

  const sendUserMail = ({ subject, email, message }) => {
    return sendMail(subject, email, message)
  }

  return {
    findAll,
    findByEmail,
    create,
    modify,
    login,
    verify,
    sendUserMail
  }
}
