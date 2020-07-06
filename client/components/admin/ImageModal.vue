<template>
  <transition name="fade">
    <div
      v-if="opened"
      class="modal-container"
    >
      <div
        v-closable="{
          className: 'modal-container',
          handler: 'closeModal',
        }"
        class="modal"
      >
        <h2>Images</h2>
        <div class="modal-content">
          <ul class="tab-header">
            <li :class="{ active: tab === 1 }" @click="tab = 1">
              Upload
            </li>
            <li :class="{ active: tab === 0 }" @click="tab = 0">
              Images
            </li>
          </ul>

          <div v-if="tab === 1" :class="{ active: tab === 1 }" class="upload">
            <label>Url</label>
            <input id="url" v-model="imageSrc" type="text">
            <div
              class="upload-file"
              :style="{ backgroundImage: `url(${imagePreviewUrl})`}"
            >
              <span v-if="!imagePreviewUrl">Upload</span>
              <input type="file" @change="fileChange">
            </div>
            <button
              :disabled="!validImage"
              @click="addImage(selectedFile, command)"
            >
              Add
            </button>
          </div>
          <div v-if="tab === 0" :class="{ active: tab === 0 }">
            <ul class="image-list">
              <li
                v-for="image in images"
                :key="image._id"
                :style="{ backgroundImage: `url(${apiConfig.url}/uploads/${image.name})`}"
                @click="insertImage(image.name)"
              >
                <span class="img-delete" @click.stop="deleteImg(image)">
                  <icon name="trash3" fill="#fff" width="1.2rem" height="1.2rem" />
                </span>
                <span class="img-main" @click.stop="updateMainImg(image)">
                  <icon name="image" fill="#fff" width="1.2rem" height="1.2rem" />
                </span>
                <div class="img-add">
                  <icon name="cross" fill="#fff" width="1.5rem" height="1.5rem" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { apiConfig } from '../../utils/config'
import Icon from '../common/Icon'

export default {
  components: {
    Icon
  },
  props: {
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
    },
    updateMainImg: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      selectedFile: null,
      imageSrc: '',
      imagePreviewUrl: '',
      command: null,
      opened: false,
      tab: 1,
      apiConfig
    }
  },
  computed: {
    validImage () {
      if (this.imageSrc) {
        return (
          this.imageSrc.match(/unsplash/) !== null ||
          this.imageSrc.match(/\.(jpeg|jpg|gif|png)$/) != null
        )
      } else {
        return !!this.selectedFile
      }
    }
  },
  methods: {
    showModal (command) {
      // Add the sent command
      this.command = command
      this.opened = true
    },

    toggleModal () {
      this.opened = !this.opened
    },

    insertImage (imgName) {
      const src = `${apiConfig.url}/uploads/${imgName}`

      this.command({ src })
    },

    fileChange (e) {
      this.imagePreviewUrl = ''

      if (e.target.files && e.target.files.length) {
        const [file] = e.target.files

        this.selectedFile = file
        this.imagePreviewUrl = URL.createObjectURL(file)
      }
    },

    closeModal () {
      this.opened = false
      this.imageSrc = ''
      this.tab = 1
    }
  }
}
</script>

<style scoped lang="scss" src="./ImageModal.scss" />
