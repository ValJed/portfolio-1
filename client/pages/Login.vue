<template>
  <div class="page-content">
    <form>
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

      if (status === 200) {
        const date = new Date()
        date.setDate(date.getDate() + 1)
        document.cookie = `portfolio-token=${data.token}; expires=${date}.`

        this.$router.push({ path: '/admin' })
      }
    }
  }
}
</script>

<style src="./Login.scss" lang="scss" scoped />
