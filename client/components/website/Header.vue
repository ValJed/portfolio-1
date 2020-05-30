<template>
  <header>
    <div class="logo">
      <icon
        name="logo"
        fill="#fff"
        height="3rem"
        width="4rem"
      />
      <div
        v-if="isMobile"
        class="burger"
        :class="{ opened}"
        @click="opened = !opened"
      >
        <div />
        <div />
      </div>
    </div>

    <transition name="menu">
      <ul v-if="!isMobile" class="menu">
        <li :class="{active: currentPage === 'home'}">
          work
        </li>
        <li :class="{active: currentPage === 'about'}">
          about
        </li>
        <li :class="{active: currentPage === 'contact'}">
          contact
        </li>
      </ul>
      <ul v-else-if="opened" class="menu">
        <li>
          <icon
            name="work"
            height="4.375rem"
            :fill="currentPage === 'home' ? '#F195A5' : none"
            stroke="#F195A5"
          />
        </li>
        <li>
          <icon
            name="about"
            height="4.375rem"
            fill="none"
            stroke="#F195A5"
          />
        </li>
        <li>
          <icon
            name="contact"
            height="4.375rem"
            fill="none"
            stroke="#F195A5"
          />
        </li>
      </ul>
    </transition>
  </header>
</template>

<script>
import Icon from '@/components/common/Icon'

export default {
  components: {
    Icon
  },
  props: {
    isMobile: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      currentPage: '',
      opened: false
    }
  },
  mounted () {
    const { path } = this.$router.currentRoute

    this.currentPage = path.replace('/', '') || 'home'
  }
}
</script>

<style src="./Header.scss" scoped lang='scss'></style>
