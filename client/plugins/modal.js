import Vue from 'vue'
import Modal from '../components/common/Modal.vue'

const modal = {
  install (Vue) {
    this.EventBus = new Vue()

    Vue.component('modal', Modal)

    Vue.prototype.$modal = {
      show (params) {
        modal.EventBus.$emit('show', params)
      }
    }
  }
}

Vue.use(modal)
