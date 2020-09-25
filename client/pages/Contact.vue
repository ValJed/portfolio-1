<template>
  <div class="page-content">
    <div class="contact-infos">
      <h1>Contact</h1>
      <p>Do you have any question / proposition ?</p>
      <p>You can send me a message here !</p>
    </div>
    <form @submit.prevent="sendMail(subject, email, message)">
      <label>
        Subject
        <span v-if="subjectErr" class="error">
          {{ subjectErr }}
        </span>
      </label>
      <div class="input-container">
        <input
          v-model="subject"
          maxlength="50"
          type="text"
          @change="subjectErr = null"
        >
      </div>
      <label>
        Mail
        <span v-if="emailErr" class="error">
          {{ emailErr }}
        </span>
      </label>
      <div class="input-container">
        <input
          v-model="email"
          type="text"
          @change="emailErr = null"
        >
      </div>
      <label>
        Message
        <span v-if="messageErr" class="error">
          {{ messageErr }}
        </span>
      </label>
      <div class="input-container">
        <textarea v-model="message" @change="messageErr = null" />
      </div>
      <button type="submit">
        Send
      </button>
    </form>
    <notifications position="bottom left" classes="notifications" />
  </div>
</template>

<script>
import network from '@/utils/network'

export default {
  data () {
    return {
      subject: 'toto',
      email: 'toto@gmail.fr',
      message: 'coucou c\'est toto',
      subjectErr: null,
      emailErr: null,
      messageErr: null
    }
  },
  methods: {
    async sendMail (subject, email, message) {
      this.validateFields(subject, email, message)
      if (this.subjectErr || this.emailErr || this.messageErr) {
        return
      }

      const { status } = await network({
        method: 'post',
        route: 'mail',
        data: {
          subject,
          email,
          message
        }
      })

      if (status === 200) {
        this.$notify({
          title: 'Your message has been sent',
          type: 'success'
        })
      } else {
        this.$notify({
          title: 'Your message could not be sent',
          type: 'error'
        })
      }
    },

    validateMail (mail) {
      const regex = /^[^\s]+@\w+\.\w+$/

      return regex.test(mail)
    },

    validateFields (subject, email, message) {
      const emptyFieldMsg = 'This field must be filled'

      if (!subject.length) {
        this.subjectErr = emptyFieldMsg
      }
      if (!email.length) {
        this.emailErr = emptyFieldMsg
      } else if (!this.validateMail(email)) {
        this.emailErr = 'This field must be an email'
      }
      if (!message.length) {
        this.messageErr = 'Nothing to tell me ?'
      }
    }
  }
}
</script>

<style src="./Contact.scss" scoped lang="scss" />
