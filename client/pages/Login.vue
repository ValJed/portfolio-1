<template>
  <div class="container">
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
