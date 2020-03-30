const config = require('config')

const http = require('../interfaces/http')
const logger = require('../infra/logger')()

// Services
const ProjectService = require('./services/projectService')
const userService = require('./services/userService')

// Infra
const database = require('../infra/mongodb')

// Repositories
const userRepository = require('../infra/mongodb/repositories/userRepo')
const ProjectsRepository = require('../infra/mongodb/repositories/projectRepo')

const jwt = require('../infra/jwt')
const encrypt = require('../infra/encryption')

const startApp = async () => {
  const client = await database.connect(config.dbConfig)

  const userRepo = userRepository(database.db())
  const projectRepo = ProjectsRepository(database.db())

  http.start({
    config,
    database: client,
    log: logger,
    services: {
      project: ProjectService({
        projectRepo,
        jwt: jwt(config),
        log: logger
      }),
      user: userService({
        userRepo,
        projectRepo,
        encrypt,
        jwt: jwt(config),
        log: logger
      })
    }
  })
}

startApp()
