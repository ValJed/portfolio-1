<template>
  <div class="page-content">
    <form>
      <label>Username</label>
      <div class="input-container">
        <input v-model="form.username" type="text">
      </div>
      <label>Password</label>
      <div class="input-container">
        <input v-model="form.password" type="password">
      </div>
      <button @click.prevent="logUser(form)">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import network from '../utils/network'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async logUser (form) {
      const { status, data } = await network({
        method: 'post',
        route: 'login',
        data: form
      })

      if (status !== 200) {
        return this.$notify({
          text: data.error,
          type: 'error'
        })
      }

      const date = new Date()
      date.setDate(date.getDate() + 1)
      document.cookie = `portfolio-token=${data.token}; expires=${date}; SameSite=Lax;`

      this.$nuxt.$emit('logged-in')

      this.$router.push({ path: '/admin' })
    }
  }
}
</script>

<style src="./Login.scss" lang="scss" scoped />
