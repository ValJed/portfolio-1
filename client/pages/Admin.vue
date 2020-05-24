<template>
  <div class="container">
    <modal />
    <div class="header">
      <h1>admin</h1>
    </div>
    <div class="projects">
      <div class="projects-list">
        <button @click="selectedProject = null">
          Create new project
        </button>
        <project-list
          :projects="projects"
          :select-project="selectProject"
          :delete-project="showDeleteModal"
        />
      </div>
      <div class="projects-edition">
        <client-only>
          <edit-project
            :initial-project="selectedProject"
            :create-project="createProject"
            :update-project="updateProject"
            :images="images"
            :add-image="addImage"
            :delete-img="deleteImg"
          />
        </client-only>
      </div>
    </div>
    <notifications position="bottom left" classes="notifications" />
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import EditProject from '../components/admin/EditProject'
import { apiConfig } from '../utils/config'
import ProjectList from '@/components/admin/ProjectList'

import { get, post, put, del } from '@/utils/network'

import { bus } from '@/plugins/bus'

export default {
  components: {
    EditProject,
    ProjectList
  },
  async asyncData (context) {
    const { status: projectStatus, data: { projects } } = await get({ route: 'projects', sendToken: false })
    const { status: imageStatus, data: { images } } = await get({ route: 'images', sendToken: false })

    if (projectStatus === 200 && imageStatus === 200) {
      return { projects, images }
    }
  },

  data () {
    return {
      selectedProject: null,
      projects: [],
      images: []
    }
  },

  methods: {
    async createProject (project) {
      const { status, data } = await post('projects', project)

      if (status === 201) {
        this.projects = [
          ...this.projects,
          data
        ]

        this.selectedProject = data
      }
    },

    async updateProject (project) {
      const { status, data } = await put('projects', project)

      if (status !== 200) {
        return this.$notify({
          title: 'Error',
          type: 'errors',
          message: 'data'
        })
      }

      this.projects = this.projects
        .map(proj => proj._id === project._id ? data : proj)

      this.$notify({
        title: 'Project updated',
        type: 'success'
      })
    },

    showDeleteModal (id) {
      bus.$emit('show-modal', {
        title: 'Delete project ?',
        action: this.deleteProject,
        params: id
      })
    },

    async deleteProject (id) {
      const { status, data } = await del('projects', { id })

      if (status !== 200) {
        return this.$notify({
          title: 'Error',
          type: 'error',
          text: data
        })
      }

      this.projects = this.projects
        .filter(project => project._id !== id)

      this.$notify({
        title: 'Project deleted',
        type: 'success'
      })
    },

    async addImage (selectedFile, command) {
      const fd = new FormData()

      fd.append('image', selectedFile, selectedFile.name)
      const { status, data: image } = await post('images', fd)

      if (status === 201) {
        const src = `${apiConfig.url}/uploads/${image.name}`

        command({ src })

        this.images = [
          ...this.images,
          image
        ]
      }
    },

    async deleteImg (image) {
      const { status } = await del('/images', image)

      if (status === 200) {
        this.images = this.images
          .filter(img => img._id !== image._id)
      }
    },

    selectProject (project) {
      this.selectedProject = project
    }
  }
}
</script>

<style lang="scss" src="./Admin.scss" />
