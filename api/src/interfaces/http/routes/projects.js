const express = require('express')

module.exports = ({
  services: {
    project: projectService,
    user: userService
  },
  upload,
  config,
  log
}) => {
  const router = new express.Router()

  const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization || !authorization.includes('Bearer ')) {
      return res.status(401).send()
    }

    const token = authorization.replace('Bearer ', '')

    const valid = await userService.verify(token)

    if (!valid) {
      return res.status(401).send()
    }

    next()
  }

  // Getting all user projects
  router.get('/projects', async (req, res, next) => {
    try {
      const projects = await projectService.getProjects()

      if (projects) {
        return res.status(200).send({ projects })
      }
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Getting one user projects
  router.get('/projects/:id', async (req, res, next) => {
    try {
      const { id } = req.params

      const { project, projects } = await projectService.getProjects(id)

      if (project) {
        return res.status(200).send({ project, projects })
      }
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Creating a new project
  router.post('/projects', verifyToken, async (req, res) => {
    try {
      const project = await projectService.createProject(req.body)

      return res.status(201).send(project)
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Updating project
  router.put('/projects', verifyToken, async (req, res) => {
    try {
      const updatedProject = await projectService
        .updateProject(req.body)

      res.status(200).send(updatedProject)
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Deleting project
  router.delete('/projects', verifyToken, async (req, res) => {
    try {
      const { id } = req.body

      const response = await projectService.deleteProject(id)

      if (response.success) {
        return res.status(200).send(response)
      }

      res.status(500).send(response)
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Getting images references
  router.get('/images', async (req, res) => {
    try {
      const images = await projectService.getImages()

      if (images) {
        return res.status(200).send({ images })
      }
      res.status(500).send()
    } catch (err) {
      log.error(err)
      res.status(500).send(err)
    }
  })

  // Writing and inserting image
  // router.post('/images', verifyToken, upload.single('image'), async (req, res, next) => {
  //   try {
  //     const { filename } = req.file

  //     const createdImg = await projectService.createImage(filename)

  //     res.status(201).send(createdImg)
  //   } catch (err) {
  //     log.error(err)
  //     res.status(500).send(err.message)
  //   }
  // })

  // Writing and inserting image
  router.post('/images', verifyToken, upload.single('image'), async (req, res, next) => {
    try {
      const { file } = req

      const createdImg = await projectService.createAndUploadImage(file)

      res.status(201).send(createdImg)
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Writing and inserting image
  router.delete('/images', verifyToken, async (req, res, next) => {
    try {
      const { _id, name } = req.body

      await projectService.deleteImage(_id, name)

      res.status(200).send()
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  router.get('/about', async (req, res, next) => {
    try {
      const aboutProject = await projectService.getAboutProject()

      res.status(200).send({ about: aboutProject })
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  router.put('/about', verifyToken, async (req, res, next) => {
    try {
      const aboutProject = await projectService.updateOrCreateAbout(req.body)

      res.status(200).send(aboutProject)
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  return router
}
