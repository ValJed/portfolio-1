<template>
  <div class="page-content">
    <h1>Contact</h1>
    <p>Do you have any question / proposition ?</p>
    <p>You can send me a message here !</p>
    <form>
      <label>
        Subject
        <span class="error" v-if="subjectErr" >
          {{ subjectErr }}
        </span>
      </label>
      <div>
        <input
          v-model="subject"
          maxlength="50"
          type="text"
          @change="subjectErr = null"
        >
      </div>
      <label>
        Mail
        <span class="error" v-if="emailErr" >
        {{ emailErr }}
        </span>
      </label>
      <input
        v-model="email"
        @change="emailErr = null"
        type="text">
      <label>
        Message
        <span class="error" v-if="messageErr">
          {{ messageErr }}
        </span>
      </label>
      <textarea v-model="message" @change="messageErr = null" />
      <button @click.prevent="sendMail(subject, email, message)">
        Send
      </button>
    </form>
  </div>
</template>

<script>
// import network from '@/utils/network'

export default {
  data () {
    return {
      subject: '',
      email: '',
      message: '',
      subjectErr: null,
      emailErr: null,
      messageErr: null
    }
  },
  methods: {
    sendMail (subject, email, message) {
      this.validateFields(subject, email, message)
      // const res = await network({
      //   method: 'post',
      //   route: 'mail',
      //   data: {
      //     subject,
      //     email,
      //     message
      //   }
      // })
    },

    validateMail (mail) {
      const regex = /^[^\s]+@\w+\.\w+$/

      this.isEmailValid = regex.test(mail)
    },

    validateFields (subject, email, message) {
      const emptyFieldMsg = 'This field must be filled'

      if (!subject.length) {
        this.subjectErr = emptyFieldMsg
      }
      if (!email.length) {
        this.emailErr = emptyFieldMsg
      }
      if (!this.validateMail(email)) {
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
