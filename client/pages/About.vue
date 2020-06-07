<template>
  <div class="container">
    <Header :is-mobile="isMobile" />
    <h1>About</h1>
    <div class="about-content" v-html="about.content" />
  </div>
</template>

<script>
import Header from '@/components/website/Header'
import { get } from '@/utils/network'

export default {
  components: {
    Header
  },
  async asyncData (context) {
    const { status: projectStatus, data: { about } } = await get({ route: 'about', sendToken: false })

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
