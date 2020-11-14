require('dotenv').config()

const config = require('config')

const http = require('../interfaces/http')
const logger = require('../infra/logger')()

// Services
const ProjectService = require('./services/projectService')
const userService = require('./services/userService')

// Infra
const database = require('../infra/mongodb')
const cloudinary = require('../infra/cloudinary')
const fileUpload = require('../infra/fileUpload')
const nodemailer = require('../infra/nodemailer')

// Repositories
const userRepository = require('../infra/mongodb/repositories/userRepo')
const ProjectsRepository = require('../infra/mongodb/repositories/projectRepo')
const ImageRepository = require('../infra/mongodb/repositories/imageRepo')

// Utils
const jwt = require('../infra/jwt')
const encrypt = require('../infra/encryption')

const dbConfig = config.get('dbConfig')
const uploadConfig = config.get('uploadConfig')
const cloudinaryConfig = config.get('cloudinaryConfig')
const mailConfig = config.get('mailConfig')
const jwtConfig = config.get('jwtConfig')

const startApp = async () => {
  const client = await database.connect(dbConfig)
  const db = database.db()
  const cloud = cloudinary(cloudinaryConfig)
  const sendMail = nodemailer(mailConfig)

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
        jwt: jwt(jwtConfig),
        log: logger
      }),
      user: userService({
        userRepo,
        projectRepo,
        encrypt,
        sendMail,
        jwt: jwt(jwtConfig),
        log: logger
      })
    }
  })
}

startApp()
