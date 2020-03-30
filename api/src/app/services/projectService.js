const ProjectEntity = require('../../domain/Project')

module.exports = ({
  // usersRepo,
  projectsRepo,
  encrypt,
  jwt,
  log
}) => {
  const getprojects = async () => {
    const projects = await projectsRepo.findAll()

    if (projects && projects.length) {
      return {
        success: true,
        projects
      }
    }
    return {
      success: false,
      errors: ['No projects found for this user']
    }
  }

  const createProject = async (userId, projectName) => {
    const project = ProjectEntity(userId, projectName)

    const createdProject = await projectsRepo.createProject(project)

    if (createdProject.result.ok) {
      return {
        success: true,
        project: {
          _id: createdProject.insertedId,
          ...project
        }
      }
    }

    return {
      success: false,
      errors: ['Project couldn\'t have been created']
    }
  }

  const updateProject = async (project) => {
    const updatedProject = await projectsRepo.updateProject(project)

    console.log('updatedProject ===> ', require('util').inspect(updatedProject, { colors: true, depth: 2 }))
  }

  const deleteProject = async (projectId) => {
    const deletedProject = await projectsRepo.deleteProject(projectId)

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

  return {
    getprojects,
    createProject,
    updateProject,
    deleteProject
  }
}
