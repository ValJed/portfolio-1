<template>
  <div class="container">
    <Header :is-mobile="isMobile" />
    <nuxt />
  </div>
</template>

<script>
import Header from '@/components/common/Header'

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
