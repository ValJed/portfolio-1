// const { ObjectID } = require('mongodb')

module.exports = (name, content, img) => {
  const project = {
    name,
    img,
    content,
    CreatedAt: new Date()
  }

  return project
}
