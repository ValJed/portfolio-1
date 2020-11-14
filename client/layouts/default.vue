<template>
  <div class="container">
    <Header :is-mobile="isMobile" :is-admin="isLogged" @logout="logout" />
    <nuxt />
    <Footer />

    <notifications position="bottom left" classes="notifications" />
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/website/Footer'
import network from '@/utils/network'

export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      isMobile: false,
      isLogged: false
    }
  },
  created () {
    this.$nuxt.$on('logged-in', () => {
      this.isLogged = true
    })
  },
  async mounted () {
    this.isMobile = window.innerWidth < 599

    if (document.cookie.includes('portfolio-token')) {
      const { status } = await network({ route: 'verify' })

      if (status === 200) {
        this.isLogged = true
      }
    }
  },
  methods: {
    logout () {
      document.cookie = 'portfolio-token=;'

      this.isLogged = false

      this.$notify({
        title: 'You just logged out',
        type: 'success'
      })

      if (this.$router.currentRoute.name === 'Admin') {
        this.$router.push('/')
      }
    }
  }
}
</script>
