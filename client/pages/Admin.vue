<template>
  <div class="container">
    <!-- <Header :is-mobile="isMobile" /> -->
    <modal v-if="authorized" />

    <div v-if="authorized" class="projects">
      <div class="projects-list">
        <button @click="selectedProject = null; aboutEditing = false">
          Create new project
        </button>
        <button @click="aboutEditing = true">
          Edit about page
        </button>
        <project-list
          :projects="projects"
          :select-project="selectProject"
          :delete-project="showDeleteModal"
        />
      </div>
      <div class="projects-edition">
        <client-only>
          <edit-about
            v-if="aboutEditing"
            :about-content="aboutPage.content"
            :update-about-project="updateAboutProject"
          />
          <edit-project
            v-else
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
    <NotFound v-else />

    <notifications position="bottom left" classes="notifications" />
  </div>
</template>

<script>
import { apiConfig } from '../utils/config'
import EditProject from '@/components/admin/EditProject'
import ProjectList from '@/components/admin/ProjectList'
import EditAbout from '@/components/admin/EditAbout'
import NotFound from '@/pages/NotFound'

import { get, post, put, del } from '@/utils/network'

import { bus } from '@/plugins/bus'

export default {
  components: {
    EditProject,
    ProjectList,
    EditAbout,
    NotFound
  },
  async asyncData (context) {
    const { status: projectStatus, data: { projects } } = await get({ route: 'projects', sendToken: false })
    const { status: imageStatus, data: { images } } = await get({ route: 'images', sendToken: false })

    const aboutPage = projects.find(project => project.isAbout)

    const onlyProjects = projects.filter(project => !project.isAbout)

    if (projectStatus === 200 && imageStatus === 200) {
      return {
        projects: onlyProjects,
        images,
        ...aboutPage && { aboutPage }
      }
    }
  },

  data () {
    return {
      aboutEditing: false,
      authorized: false,
      selectedProject: null,
      isMobile: false,
      projects: [],
      aboutPage: {
        _id: '',
        content: ''
      },
      images: []
    }
  },

  async mounted () {
    this.isMobile = window.innerWidth < 599

    const { status } = await get({ route: 'verify' })

    if (status === 200) {
      this.authorized = true
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

      // this.selectedProject = data

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

    async updateAboutProject (content) {
      const newAbout = {
        ...this.aboutPage,
        content
      }

      const { status, data } = await put('about', newAbout)

      if (status === 200) {
        this.aboutPage = data
        this.$notify({
          title: 'About page updated',
          type: 'success'
        })
      } else {
        this.$notify({
          title: 'Error when updating about page',
          type: 'error'
        })
      }
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
      this.aboutEditing = false
      this.selectedProject = project
    }
  }
}
</script>

<style lang="scss" src="./Admin.scss" />
