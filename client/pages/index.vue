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
  mounted () {
    this.isMobile = window.innerWidth < 599
  }
}
</script>
<style src="./index.scss" scoped lang='scss'></style>
