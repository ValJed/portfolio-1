const userEntity = require('../../domain/User')

module.exports = ({
  userRepo,
  projectRepo,
  encrypt,
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
      errros: ['No user found for this email']
    }
  }

  const create = async ({ username, email, password }) => {
    const existingUser = await userRepo.findByUsername(username)

    if (existingUser) {
      return {
        success: false,
        errors: ['This email already match an account']
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

  const login = async ({ username, password }) => {
    const user = await userRepo.findByUsername(username)

    if (!user) {
      return {
        success: false,
        errors: ['No user found for this email']
      }
    }

    const isPasswordValid = await encrypt.comparePsw(password, user.password.hash, user.password.salt)

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
      msg: 'Password isn\'t valid'
    }
  }

  const verify = (token) => {
    const isTokenValid = jwt.verify(token)

    return {
      success: !!isTokenValid
    }
  }

  const remove = () => {
    // const user = await repository.deleteOne({})
  }

  return {
    findAll,
    findByEmail,
    create,
    login,
    verify
  }
}
