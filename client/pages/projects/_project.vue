<template>
  <!-- <Header :is-mobile="isMobile"  /> -->
  <div>
    <div class="page-content">
      <div
        class="project-img"
        :style="{ backgroundImage: `url(${project.imgUrl})` }"
      />
      <h1>{{ project.name }}</h1>
      <div class="project-content" v-html="project.content" />
    </div>
  </div>
</template>

<script>
import network from '@/utils/network'
import { apiConfig } from '@/utils/config'

export default {
  async asyncData (context) {
    const { status: projectStatus, data: { project } } = await network(
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
