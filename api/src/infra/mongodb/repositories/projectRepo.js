const { ObjectID } = require('mongodb')

const repository = (db) => {
  const ProjectsDb = db.collection('projects')

  return {
    findAll: () => ProjectsDb.find().toArray(),

    findById: (id) => ProjectsDb.findOne({ _id: ObjectID(id) }),

    createProject: (project) => ProjectsDb.insertOne(project),

    deleteProject: (id) => ProjectsDb.deleteOne({ _id: ObjectID(id) }),

    updateProject: (id, project) => ProjectsDb.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: project },
      { returnOriginal: false }),

    getAboutProject: () => ProjectsDb.findOne({
      isAbout: true
    })
  }
}

module.exports = repository
