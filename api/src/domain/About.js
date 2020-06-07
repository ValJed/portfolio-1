// const { ObjectID } = require('mongodb')

module.exports = ({ content, isAbout }) => {
  const project = {
    content,
    isAbout,
    UpdatedAt: new Date()
  }

  return project
}
