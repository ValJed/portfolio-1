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
      <div class="project-nav">
        <nuxt-link :to="`/projects/${previousId}`">
          <icon
            name="arrow-slider"
            width="5rem"
            height="1.5rem"
          />
          Go back
        </nuxt-link>
        <nuxt-link :to="`/projects/${nextId}`">
          Next project
          <icon
            name="arrow-slider"
            width="5rem"
            height="1.5rem"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import network from '@/utils/network'
import { apiConfig } from '@/utils/config'
import Icon from '@/components/common/Icon'

export default {
  async asyncData (context) {
    const { status: projectStatus, data: { project, projects } } = await network(
      {
        route: `projects/${context.params.project}`,
        sendToken: false
      })

    if (projectStatus === 200) {
      return { project, projects }
    }
  },
  data () {
    return {
      project: {},
      projects: [],
      previousId: null,
      nextId: null,
      projectId: this.$route.params.project,
      apiConfig,
      isMobile: false
    }
  },
  components: {
    Icon
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
    const projectsLength = this.projects.length

    const currentIndex = this.projects
      .findIndex(project => project._id === this.project._id)

    this.previousId = currentIndex === 0
      ? this.projects[projectsLength - 1]._id
      : this.projects[currentIndex - 1]._id

    this.nextId = currentIndex === projectsLength - 1
      ? this.projects[0]._id
      : this.projects[currentIndex + 1]._id
  }
}

</script>
<style src="./Project.scss" scoped lang='scss'></style>
