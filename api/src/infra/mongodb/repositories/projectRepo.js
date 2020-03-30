const { ObjectID } = require('mongodb')

const repository = (db) => {
  const ProjectsDb = db.collection('projects')

  return {
    findAll: () => ProjectsDb.find().toArray(),

    findById: (_id) => ProjectsDb.findOne({ _id }),

    createProject: (project) => ProjectsDb.insertOne(project),

    deleteProject: (projectId) => ProjectsDb.deleteOne({ _id: ObjectID(projectId) }),

    updateProject: (project) => ProjectsDb.findOneAndUpdate(
      { _id: ObjectID(project.id) },
      { $set: project },
      { returnOriginal: false })
  }
}

module.exports = repository
