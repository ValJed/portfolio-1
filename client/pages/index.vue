<template>
  <div class="container">
    <Header :is-mobile="isMobile" />
    <projects-slider :projects="projects" :is-mobile="isMobile" />
    <Footer />
  </div>
</template>

<script>
import { get } from '../utils/network'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import ProjectsSlider from '@/components/website/ProjectsSlider'

export default {
  components: {
    Header,
    Footer,
    ProjectsSlider
  },
  async asyncData (context) {
    const { status: projectStatus, data: { projects } } = await get({ route: 'projects', sendToken: false })
    const { status: imageStatus, data: { images } } = await get({ route: 'images', sendToken: false })

    if (projectStatus === 200 && imageStatus === 200) {
      return { projects, images }
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
    console.log('to ===> ', to)
    if (to.name === 'projects-project') {
      return {
        name: 'home-to-project',
        duration: 1000
      }
    }
    if (to.fullPath === '/about') {
      return {
        name: 'home-to-about',
        duration: 1000
      }
    }
    return {
      name: 'page',
      duration: 0
    }
  },
  mounted () {
    this.isMobile = window.innerWidth < 599
  }
  // watch: {
  //   '$route' (to, from) {
  //     console.log('to.path ===> ', to.path)
  //     console.log('from.path ===> ', from.path)
  //     // const toDepth = to.path.split('/').length
  //     // const fromDepth = from.path.split('/').length
  //     // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  //   }
  // },
}
</script>
<style src="./index.scss" lang='scss'></style>
