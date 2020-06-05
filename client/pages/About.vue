<template>
  <div class="container">
    <Header :is-mobile="isMobile" />
    <h1>About</h1>
  </div>
</template>

<script>
import Header from '@/components/website/Header'

export default {
  components: {
    Header
  },
  data () {
    return {
      isMobile: false
    }
  },
  mounted () {
    this.isMobile = window.innerWidth < 599
  }
}
</script>
<style src="./About.scss" scoped lang='scss'></style>
