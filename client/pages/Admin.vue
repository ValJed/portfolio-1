<template>
  <div class="container" />
</template>

<script>
// import Logo from '~/components/Logo.vue'
import { get } from '../utils/network'

export default {
  async asyncData (context) {
    const projects = await get('projects')

    return { projects }
  },
  data () {
    return {
      projects: []
    }
  }
}
</script>

<style lang="scss">

</style>
