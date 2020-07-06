<template>
  <!-- <Header :is-mobile="isMobile" /> -->
  <div class="page-content">
    <h1>About</h1>
    <div class="about-content project-content" v-html="about.content" />
  </div>
</template>

<script>
// import Header from '@/components/website/Header'
import network from '@/utils/network'

export default {
  async asyncData (context) {
    const {
      status: projectStatus,
      data: { about }
    } = await network({ route: 'about', sendToken: false })

    if (projectStatus === 200) {
      return { about }
    }
  },
  data () {
    return {
      isMobile: false,
      about: null
    }
  },
  transition (to, from) {
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
<style src="./About.scss" scoped lang='scss'></style>
