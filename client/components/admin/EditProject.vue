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
      </div>
      <div
        v-if="project.img"
        class="edit-project-img"
        :style="{ backgroundImage: `url(${apiConfig.url}/uploads/${project.img})`}"
      />
    </div>
    <editor
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
      apiConfig
    }
  },
  computed: {
    project () {
      if (this.initialProject) {
        console.log('this.initialProject ===> ', this.initialProject)
        return {
          _id: this.initialProject._id,
          name: this.initialProject.name,
          img: this.initialProject.img,
          content: this.initialProject.content
        }
      }

      return {
        name: '',
        content: '',
        img: ''
      }
    }
  },
  mounted () {
    console.log('this.project.img ===> ', this.project.img)
  },
  methods: {
    updateContent (content) {
      this.project.content = content
    },

    updateMainImg (img) {
      this.project.img = img.name
      console.log('this.project ===> ', this.project)
    }
  }
}
</script>

<style lang="scss" src="./EditProject.scss" />
