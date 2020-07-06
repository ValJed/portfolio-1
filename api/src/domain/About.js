// const { ObjectID } = require('mongodb')

module.exports = ({ content }) => {
  const project = {
    content,
    isAbout: true,
    UpdatedAt: new Date()
  }

  return project
}
