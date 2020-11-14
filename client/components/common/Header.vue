<template>
  <header :class="{opened}">
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
        :class="{ opened }"
        @click="opened = !opened"
      >
        <div />
        <div />
      </div>
    </div>

    <transition name="menu">
      <ul v-if="!isMobile" class="menu">
        <li>
          <nuxt-link to="/">
            work
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">
            about
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/contact">
            contact
          </nuxt-link>
        </li>
        <li v-if="isAdmin">
          <nuxt-link to="/admin">
            admin
          </nuxt-link>
        </li>
        <li v-if="isAdmin" @click="logout">
          logout
        </li>
      </ul>
      <ul v-else-if="opened" class="menu">
        <li>
          <nuxt-link to="/">
            <div @click="closeMenu">
              <icon
                name="work"
                height="4.375rem"
                stroke="#F195A5"
              />
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">
            <div @click="closeMenu">
              <icon
                name="about"
                height="4.375rem"
                stroke="#F195A5"
              />
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/contact">
            <div @click="closeMenu">
              <icon
                name="contact"
                height="4.375rem"
                stroke="#F195A5"
              />
            </div>
          </nuxt-link>
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
    },
    isAdmin: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      opened: false
    }
  },
  computed: {
    currentPage () {
      return this.$route.name
    }
  },
  methods: {
    closeMenu () {
      this.opened = false
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

<style src="./Header.scss" scoped lang='scss'></style>
