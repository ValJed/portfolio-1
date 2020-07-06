<template>
  <div class="edit-project">
    <button v-if="!initialProject" class="create-btn" @click="createProject(project)">
      Create
    </button>
    <button v-else class="create-btn" @click="updateProject(project)">
      Update
    </button>
    <div class="edit-project-header">
      <div>
        <h3 v-if="!initialProject">
          Create project
        </h3>
        <h3 v-else>
          Edit project
        </h3>
        <input v-model="project.name" type="text">
        <input v-model="project.description" type="text">
      </div>
      <div
        v-if="project.img"
        class="edit-project-img"
        :style="{ backgroundImage: `url(${apiConfig.url}/uploads/${project.img})`}"
      />
    </div>
    <editor
      :id="project._id"
      :content="project.content"
      :update-content="updateContent"
      :images="images"
      :add-image="addImage"
      :delete-img="deleteImg"
      :update-main-img="updateMainImg"
    />
  </div>
</template>

<script>
// check project change with id
import { apiConfig } from '../../utils/config'
import Editor from './Editor'

export default {
  components: {
    Editor
  },
  props: {
    initialProject: {
      type: Object,
      default: () => null,
      required: false
    },
    createProject: {
      type: Function,
      required: true
    },
    updateProject: {
      type: Function,
      required: true
    },
    images: {
      type: Array,
      required: true
    },
    addImage: {
      type: Function,
      required: true
    },
    deleteImg: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      apiConfig,
      project: {
        name: '',
        description: '',
        img: '',
        content: ''
      }
    }
  },
  watch: {
    initialProject (newVal, oldVal) {
      if (newVal) {
        this.project = newVal
      } else {
        this.project = {
          name: '',
          description: '',
          img: '',
          content: ''
        }
      }
    }
  },

  mounted () {
    if (this.initialProject) {
      this.project = this.initialProject
    }
  },
  methods: {
    updateContent (content) {
      this.project.content = content
    },

    updateMainImg (img) {
      this.project.img = img.name
    }
  }
}
</script>

<style lang="scss" src="./EditProject.scss" />
