const config = require('config')

const http = require('../interfaces/http')
const logger = require('../infra/logger')()

// Services
const ProjectsServices = require('./services/projects')

// Infra
const database = require('../infra/mongodb')

// Repositories
const usersRepository = require('../infra/mongodb/repositories/users')
const ProjectsRepository = require('../infra/mongodb/repositories/projects')

const jwt = require('../infra/jwt')
// const encrypt = require('../infra/encryption')

const startApp = async () => {
  const client = await database.connect(config.dbConfig)

  const usersRepo = usersRepository(database.db())
  const projectsRepo = ProjectsRepository(database.db())

  http.start({
    config,
    database: client,
    log: logger,
    services: {
      projects: ProjectsServices({
        usersRepo,
        projectsRepo,
        jwt: jwt(config),
        log: logger
      })
    }
  })
}

startApp()
