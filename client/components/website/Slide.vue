<template>
  <transition name="slide">
    <li
      v-if="showSlide"
      class="slide"
      :class="{
        'slide-active': isCurrentSlide,
        'slide-next': isNextSlide
      }"
    >
      <nuxt-link
        :to="`/projects/${project._id}`"
        class="project"
        :style="{ backgroundImage: `url(${apiConfig.url}/uploads/${project.img})` }"
      >
        <div class="project-description">
          <h1>
            {{ project.name }}
          </h1>
          <h3>Branding, Art direction</h3>
        </div>
      </nuxt-link>
    </li>
  </transition>
</template>

<script>
import { apiConfig } from '@/utils/config'

export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    slidesIndex: {
      type: Number,
      required: true
    },
    slidesCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      apiConfig
    }
  },
  computed: {
    isCurrentSlide () {
      return this.currentIndex === this.slidesIndex
    },
    isNextSlide () {
      return !this.isLastSlide
        ? this.currentIndex === this.slidesIndex + 1
        : this.currentIndex === 0
    },
    showSlide () {
      return !this.isLastSlide
        ? this.isCurrentSlide || this.isNextSlide
        : this.isCurrentSlide || this.currentIndex === 0
    },

    isLastSlide () {
      return this.slidesIndex + 1 === this.slidesCount
    }
  },
  mounted () {
    console.log('this.project ===> ', this.project)
  }
}
</script>

<style src="./Slide.scss" scoped lang='scss'></style>
