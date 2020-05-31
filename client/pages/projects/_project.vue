<template>
  <div class="container">
    <Header :is-mobile="isMobile" :style="{position: 'fixed'}" />
    <div
      class="project-img"
      :style="{ backgroundImage: `url(${apiConfig.url}/uploads/${currentProject.img})` }"
    />
    <h1>{{ currentProject.name }}</h1>
    <div class="project-content" v-html="currentProject.content" />
    <Footer />
  </div>
</template>

<script>
import { get } from '@/utils/network'
import { apiConfig } from '@/utils/config'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'

export default {
  components: {
    Header,
    Footer
  },
  async asyncData (context) {
    const { status: projectStatus, data: { projects } } = await get({ route: 'projects', sendToken: false })
    // const { status: imageStatus, data: { images } } = await get({ route: 'images', sendToken: false })

    if (projectStatus === 200) {
      return { projects }
    }
  },
  data () {
    return {
      projects: [],
      projectId: this.$route.params.project,
      apiConfig,
      isMobile: false
    }
  },
  computed: {
    currentProject () {
      return this.projects
        .find(project => project._id === this.projectId)
    }
  },
  mounted () {
    this.isMobile = window.innerWidth < 599
  }
}

</script>
<style src="./Project.scss" scoped lang='scss'></style>
