<template>
  <!-- <Header :is-mobile="isMobile"  /> -->
  <div class="page-content">
    <div
      class="project-img"
      :style="{ backgroundImage: `url(${apiConfig.url}/uploads/${project.img})` }"
    />
    <h1>{{ project.name }}</h1>
    <div class="project-content" v-html="project.content" />
  </div>
</template>

<script>
import { get } from '@/utils/network'
import { apiConfig } from '@/utils/config'

export default {
  components: {

  },
  async asyncData (context) {
    const { status: projectStatus, data: { project } } = await get(
      {
        route: `projects/${context.params.project}`,
        sendToken: false
      })

    if (projectStatus === 200) {
      return { project }
    }
  },
  data () {
    return {
      project: {},
      projectId: this.$route.params.project,
      apiConfig,
      isMobile: false
    }
  },
  transition (to, from) {
    if (!['index', 'projects-project'].includes(to.name)) {
      return {
        name: 'page',
        duration: 300
      }
    }
  },
  mounted () {
    this.isMobile = window.innerWidth < 599
  }
}

</script>
<style src="./Project.scss" scoped lang='scss'></style>
