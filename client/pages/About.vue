<template>
  <div class="container">
    <Header :is-mobile="isMobile" />
    <h1>About</h1>
    <div class="about-content project-content" v-html="about.content" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { get } from '@/utils/network'

export default {
  components: {
    Header,
    Footer
  },
  async asyncData (context) {
    const {
      status: projectStatus,
      data: { about }
    } = await get({ route: 'about', sendToken: false })

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
  mounted () {
    this.isMobile = window.innerWidth < 599
  }
}
</script>
<style src="./About.scss" scoped lang='scss'></style>
