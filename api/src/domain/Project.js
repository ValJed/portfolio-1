// const { ObjectID } = require('mongodb')

module.exports = ({ name, description, content, img }) => {
  const project = {
    name,
    description,
    img,
    content,
    CreatedAt: new Date()
  }

  return project
}
