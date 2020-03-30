const { ObjectID } = require('mongodb')

module.exports = (userId, name) => {
  const project = {
    name,
    img: '',
    content: '',
    CreatedAt: new Date()
  }

  return project
}
