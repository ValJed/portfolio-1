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
const ImageRepository = require('../infra/mongodb/repositories/imageRepo')

// Utils
const jwt = require('../infra/jwt')
const encrypt = require('../infra/encryption')
const fileUpload = require('../infra/fileUpload')

const dbConfig = config.get('dbConfig')
const uploadConfig = config.get('uploadConfig')

const startApp = async () => {
  const client = await database.connect(dbConfig)
  const db = database.db()

  const userRepo = userRepository(db)
  const projectRepo = ProjectsRepository(db)
  const imageRepo = ImageRepository(db)

  http.start({
    config,
    database: client,
    log: logger,
    upload: fileUpload(uploadConfig, encrypt),
    services: {
      project: ProjectService({
        projectRepo,
        imageRepo,
        uploadConfig,
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
