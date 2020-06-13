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
      // mainImg: null
      // name: '',
      // description: '',
      // img: '',
      // content: ''
      project: {
        name: '',
        description: '',
        img: '',
        content: ''
      }
    }
  },
  // computed: {
  //   getContent () {
  //     return this.content
  //   }
  // },
  // computed: {
  //   project () {
  //     if (this.initialProject) {
  //       return {
  //         _id: this.initialProject._id,
  //         name: this.initialProject.name,
  //         img: this.initialProject.img,
  //         content: this.initialProject.content
  //       }
  //     }

  //     return {
  //       ...this.projectData._id && { _id: this.projectData._id },
  //       name: this.projectData.name,
  //       description: this.projectData.description,
  //       img: this.projectData.img,
  //       content: this.projectData.content
  //     }
  //   }
  // },
  watch: {
    initialProject (newVal, oldVal) {
      // const { _id, name, description, content, img } = newVal

      // this._id = _id
      // this.name = name
      // this.description = description
      // this.content = content
      // this.img = img

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
      // const { _id, name, description, content, img } = this.initialProject
      // this._id = _id
      // this.name = name
      // this.description = description
      // this.content = content
      // this.img = img

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
