// const { ObjectID } = require('mongodb')

module.exports = ({ name, description, content, imgUrl }) => {
  const project = {
    name,
    description,
    imgUrl,
    content,
    CreatedAt: new Date()
  }

  return project
}
