<template>
  <div class="edit-about">
    <div class="edit-about-header">
      <h3>Edit about page</h3>
      <button @click="updateAboutProject(content)">
        Update
      </button>
    </div>
    <editor
      :content="content"
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
    aboutContent: {
      type: String,
      required: true
    },
    updateAboutProject: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      content: this.aboutContent
    }
  },
  methods: {
    updateContent (content) {
      this.content = content
    }
  }
}
</script>
<style src='./EditAbout.scss' scoped lang='scss'></style>
