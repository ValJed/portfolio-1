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
        res.status(401).send(response)
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

  // Creating new user only in dev mode
  if (process.env.NODE_ENV === 'development') {
    router.post('/users', async (req, res, next) => {
      try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
          return res.status(400).send('You need to define username, email, and password')
        }

        const response = await userService.create({ username, email, password })

        if (response.success) {
          res.status(201).send(response)
        } else {
          res.status(400).send(response)
        }
      } catch (err) {
        log.error(err)
        res.status(500).send(err.message)
      }
    })
  }

  // Updating user
  router.put('/users', async (req, res, next) => {
    try {
      const data = req.body

      const response = await userService.modify(data)

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
