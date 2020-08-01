const config = require('config')

const http = require('../interfaces/http')
const logger = require('../infra/logger')()

// Services
const ProjectService = require('./services/projectService')
const userService = require('./services/userService')

// Infra
const database = require('../infra/mongodb')
const cloudinary = require('../infra/cloudinary')

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
const cloudinaryConfig = config.get('cloudinaryConfig')

const startApp = async () => {
  const client = await database.connect(dbConfig)
  const db = database.db()
  const cloud = cloudinary(cloudinaryConfig)

  const userRepo = userRepository(db)
  const projectRepo = ProjectsRepository(db)
  const imageRepo = ImageRepository(db)

  http.start({
    config,
    database: client,
    log: logger,
    upload: fileUpload(uploadConfig, encrypt, cloud),
    services: {
      project: ProjectService({
        projectRepo,
        imageRepo,
        uploadConfig,
        cloud,
        encrypt,
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
