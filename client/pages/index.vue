<template>
  <div class="home">
    <projects-slider :projects="projects" :is-mobile="isMobile" />
  </div>
</template>

<script>
import network from '@/utils/network'
import ProjectsSlider from '@/components/website/ProjectsSlider'

export default {
  components: {
    ProjectsSlider
  },
  async asyncData (context) {
    const { status: projectStatus, data: { projects } } = await network({ route: 'projects', sendToken: false })
    const { status: imageStatus, data: { images } } = await network({ route: 'images', sendToken: false })

    const onlyProjects = projects.filter(project => !project.isAbout)

    if (projectStatus === 200 && imageStatus === 200) {
      return {
        projects: onlyProjects,
        images
      }
    }
  },
  data () {
    return {
      projects: [],
      images: [],
      isMobile: false
    }
  },
  transition (to, from) {
    const isMobile = window.innerWidth < 599

    if (to.name === 'projects-project' && !isMobile) {
      return {
        name: 'home-to-project',
        duration: 1000
      }
    }
    return {
      name: 'page',
      duration: 300
    }
  },
  mounted () {
    this.isMobile = window.innerWidth < 599
  }
}
</script>
<style src="./index.scss" lang='scss'></style>
