<template>
  <div class="container">
    <h1>Log to admin your portfolio</h1>
    <form relo="form">
      <label>Username :</label>
      <input v-model="form.username" type="text">
      <label>Password :</label>
      <input v-model="form.password" type="password">
      <button @click.prevent="logUser(form)">
        Login
      </button>
    </form>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import { post } from '../utils/network'

export default {
  data () {
    return {
      form: {
        username: 'Aurore',
        password: 'toto'
      }
    }
  },
  methods: {
    async logUser (form) {
      const { status, data } = await post('login', form)

      if (status === 200) {
        this.$router.push({ path: '/admin' })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
