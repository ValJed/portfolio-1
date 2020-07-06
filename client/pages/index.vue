<template>
  <div>
    <!-- <Header :is-mobile="isMobile" /> -->
    <projects-slider :projects="projects" :is-mobile="isMobile" />
  </div>
</template>

<script>
import { get } from '../utils/network'
import ProjectsSlider from '@/components/website/ProjectsSlider'

export default {
  components: {
    ProjectsSlider
  },
  async asyncData (context) {
    const { status: projectStatus, data: { projects } } = await get({ route: 'projects', sendToken: false })
    const { status: imageStatus, data: { images } } = await get({ route: 'images', sendToken: false })

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
    if (to.name === 'projects-project') {
      return {
        name: 'home-to-project',
        duration: 1000
      }
    }
    // if (to.fullPath === '/about') {
    //   return {
    //     name: 'home-to-about',
    //     duration: 1000
    //   }
    // }
    return {
      name: 'page',
      duration: 300
    }
  },
  mounted () {
    this.isMobile = window.innerWidth < 599
  }
  // watch: {
  //   '$route' (to, from) {
  //     // const toDepth = to.path.split('/').length
  //     // const fromDepth = from.path.split('/').length
  //     // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  //   }
  // },
}
</script>
<style src="./index.scss" lang='scss'></style>
