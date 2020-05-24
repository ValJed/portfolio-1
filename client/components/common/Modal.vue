<template>
  <transition name="fade">
    <div
      v-if="opened"

      class="modal-container"
    >
      <div
        v-closable="{
          show,
          className: 'modal',
          handler: 'close',
        }"
        class="modal"
      >
        <h3>{{ title }}</h3>
        <button @click="runAction(params)">
          Yes
        </button>
        <button @click="close()">
          Cancel
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { bus } from '@/plugins/bus'

export default {
  data () {
    return {
      title: '',
      opened: false
    }
  },

  beforeMount () {
    // here we need to listen for emited events
    // we declared those events inside our plugin
    bus.$on('show-modal', (params) => {
      this.show(params)
    })
  },

  methods: {
    show ({ title, action, params }) {
      this.opened = true
      this.title = title
      this.action = action
      this.params = params

      if (this.showInput) {
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
    },
    runAction () {
      this.action(this.params)
      this.close()
    },
    close () {
      this.opened = false
    }
  }
}
</script>

<style src="./Modal.scss" lang="scss" scoped />
