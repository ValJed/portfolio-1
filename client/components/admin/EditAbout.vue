<template>
  <div class="edit-about">
    <div class="edit-about-header">
      <h3>Edit about page</h3>
      <button @click="updateAboutProject(about)">
        Update
      </button>
    </div>
    <editor
      :content="about.content"
      :update-content="updateContent"
    />
  </div>
</template>

<script>
import Editor from '@/components/admin/Editor'

export default {
  components: {
    Editor
  },
  props: {
    aboutPage: {
      type: Object,
      required: true
    },
    updateAboutContent: {
      type: Function,
      required: true
    },
    updateAboutProject: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      aboutData: {
        _id: '',
        content: '',
        isAbout: true
      }
    }
  },
  computed: {
    about () {
      if (this.aboutPage) {
        return {
          _id: this.aboutPage._id,
          content: this.aboutPage.content,
          isAbout: this.aboutPage.isAbout
        }
      }

      return {
        _id: this.aboutData._id,
        content: this.aboutData.content,
        isAbout: this.aboutData.isAbout
      }
    }
  },
  methods: {
    updateContent (content) {
      this.aboutData.content = content
    }
  }
}
</script>
<style src='./EditAbout.scss' scoped lang='scss'></style>
