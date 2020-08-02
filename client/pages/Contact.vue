<template>
  <div class="page-content">
    <h1>Contact</h1>
    <p>Do you have any question / proposition ?</p>
    <p>You can send me a message here !</p>
    <form>
      <label>Subject</label>
      <input v-model="subject" type="text">
      <label>Mail</label>
      <input v-model="email" type="email">
      <label>Message</label>
      <textarea v-model="message" />
      <button @click.prevent="sendMail(subject, email, message)">Send</button>
    </form>
  </div>
</template>

<script>
import network from '@/utils/network'

export default {
  data () {
    return {
      subject: '',
      email: '',
      message: ''
    }
  },
  methods: {
    async sendMail (subject, email, message) {
      const res = await network({
        method: 'post',
        route: 'mail',
        data: {
          subject,
          email,
          message
        }
      })

      console.log('res ===> ', res)
    }
  }
}
</script>

<style src="./Contact.scss" scoped lang="scss" />
