<template>
  <transition name="fade">
    <div
      v-if="opened"
      class="modal-container"
    >
      <div
        v-closable="{
          className: 'modal-container',
          handler: 'closeModal',
        }"
        class="modal"
      >
        <form @submit.prevent="ModifyCredentials({username, psw, newUsername, newPsw})">
          <label for="">Username</label>
          <div class="input-container">
            <input v-model="username" type="text">
          </div>
          <label for="">Password</label>
          <div class="input-container">
            <input v-model="psw" type="password">
          </div>
          <label for="">New username</label>
          <div class="input-container">
            <input v-model="newUsername" type="text">
          </div>
          <label for="">New password</label>
          <div class="input-container">
            <input v-model="newPsw" type="password">
          </div>
          <button type="submit">
            Modify
          </button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import network from '../../utils/network'

export default {
  data () {
    return {
      opened: false,
      username: '',
      psw: '',
      newUsername: '',
      newPsw: ''
    }
  },
  methods: {
    showModal () {
      // Add the sent command
      this.opened = true
    },

    toggleModal () {
      this.opened = !this.opened
    },

    closeModal () {
      this.opened = false
    },
    async ModifyCredentials (formData) {
      const { data, status } = await network({
        method: 'put',
        route: 'users',
        data: formData
      })

      if (status !== 200) {
        return this.$notify({
          title: data.error,
          type: 'error'
        })
      }

      this.$notify({
        title: 'Credentials modified',
        type: 'success'
      })

      this.opened = false
    }
  }
}
</script>

<style lang="scss" src="./CredentialsModal.scss" scoped />
