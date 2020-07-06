const ProjectEntity = require('../../domain/Project')
const AboutEntity = require('../../domain/About')
const fs = require('fs')
const path = require('path')

module.exports = ({
  // usersRepo,
  projectRepo,
  imageRepo,
  uploadConfig,
  jwt,
  log
}) => {
  const getProjects = async (id) => {
    return id ? projectRepo.findById(id) : projectRepo.findAll()

    // if (projects && Array.isArray(projects)) {
    //   return projects
    // }

    // throw new Error('Error when requesting projects.')
  }

  const createProject = async (projectData) => {
    const project = ProjectEntity(projectData)

    const createdProject = await projectRepo.createProject(project)

    if (!createdProject.result.ok) {
      throw new Error('Project couldn\'t have been created')
    }

    return {
      _id: createdProject.insertedId,
      ...project
    }
  }

  const updateProject = async (projectData) => {
    const project = ProjectEntity(projectData)

    const updatedProject = await projectRepo.updateProject(projectData._id, project)

    if (updatedProject.ok && updatedProject.value) {
      return updatedProject.value
    }

    throw new Error('Error when updating project in database.')
  }

  const deleteProject = async (projectId) => {
    const deletedProject = await projectRepo.deleteProject(projectId)

    if (deletedProject.result.ok) {
      return {
        success: true,
        projectId
      }
    }

    return {
      success: false,
      errors: ['Project didn\'t have been deleted']
    }
  }

  const getImages = async () => {
    const images = await imageRepo.findAll()

    return images
  }

  const createImage = async (fileName) => {
    const image = {
      name: fileName
    }

    const { insertedCount, insertedId } = await imageRepo.createOne(image)

    if (insertedCount === 1) {
      return {
        _id: insertedId,
        name: fileName
      }
    }

    throw new Error('Error when inserting image in database.')
  }

  const unlinkImg = (pathToFile, name) => {
    return new Promise((resolve, reject) => {
      fs.unlink(path.join(pathToFile, name), (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }

  const deleteImage = async (id, name) => {
    const { deletedCount } = await imageRepo.deleteOne(id)

    if (deletedCount !== 1) {
      throw new Error('Error when deleting image reference in database.')
    }

    const pathToFile = path.join(process.cwd(), uploadConfig.path)

    await unlinkImg(pathToFile, name)
  }

  const getAboutProject = async () => {
    return projectRepo.getAboutProject()
  }

  const updateOrCreateAbout = async (aboutData) => {
    const about = AboutEntity(aboutData)

    // Getting an _id from the front means the about project already exist
    if (aboutData._id) {
      const updatedProject = await projectRepo.updateProject(aboutData._id, about)

      return updatedProject.value
    } else {
      const { insertedId } = await projectRepo.createProject(about)

      return {
        _id: insertedId,
        ...about
      }
    }
  }

  return {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    getImages,
    createImage,
    deleteImage,
    getAboutProject,
    updateOrCreateAbout
  }
}
