<template>
  <transition name="slide">
    <li
      v-if="showSlide || isMobile"
      class="slide"
      :class="{
        'slide-active': (isCurrentSlide && !isMobile) || (isActive && !isMobile),
        'slide-next': isNextSlide && !isMobile,
      }"
    >
      <nuxt-link
        v-if="isCurrentSlide || isMobile"
        :to="`/projects/${project._id}`"
        class="project"
        prefetch
        :style="{ backgroundImage: `url(${project.imgUrl})` }"
      >
        <div class="project-description">
          <h1>
            {{ project.name }}
          </h1>
          <h3>{{ project.description }}</h3>
        </div>
      </nuxt-link>
      <div
        v-else
        class="project"
        :style="{ backgroundImage: `url(${project.imgUrl})` }"
      >
        <div class="project-description">
          <h1>
            {{ project.name }}
          </h1>
          <h3>{{ project.description }}</h3>
        </div>
      </div>
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
    },
    isMobile: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      apiConfig,
      isActive: null
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
      const show = !this.isLastSlide
        ? this.isCurrentSlide || this.isNextSlide
        : this.isCurrentSlide || this.currentIndex === 0

      return show
    },

    isLastSlide () {
      return this.slidesIndex + 1 === this.slidesCount
    }
  },
  methods: {
    keyEnter ({ keyCode }) {
      if (keyCode === 13) {
        this.$router.push({
          path: `/projects/${this.nextId}`
        })
      }
    }
  }
}
</script>

<style src="./Slide.scss" scoped lang='scss'></style>
