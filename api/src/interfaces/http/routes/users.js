const express = require('express')

module.exports = ({
  services: {
    user: userService
  },
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

  // Login user
  router.post('/login', async (req, res) => {
    try {
      const data = req.body
      const response = await userService.login(data)

      if (response.success) {
        res.status(200).send(response)
      } else {
        res.status(400).send(response)
      }
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Login user
  router.get('/verify', verifyToken, async (req, res, next) => {
    try {
      return res.status(200).send()
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Creating new user
  router.post('/users', async (req, res, next) => {
    try {
      const data = req.body

      const response = await userService.create(data)

      if (response.success) {
        res.status(201).send(response)
      } else {
        res.status(400).send(response)
      }
    } catch (err) {
      log.error(err)
      res.status(400).send(err.message)
    }
  })

  // Send mail
  router.post('/mail', async (req, res, next) => {
    const data = req.body

    const { success } = await userService.sendUserMail(data)

    if (success) {
      return res.status(200).send()
    }

    res.status(500).send()
  })

  return router
}
