<template>
  <div class="projects-slider page-content">
    <ul>
      <slide
        v-for="(project, index) in projectsList"
        :key="index"
        :project="project"
        :current-index="index"
        :slides-index="slidesIndex"
        :slides-count="projectsList.length"
      />
      <div
        v-if="!isMobile"
        class="arrow"
        @click="throttleSlide"
      >
        <icon
          name="arrow-slider"
          width="5rem"
          height="1.5rem"
        />
      </div>
    </ul>
  </div>
</template>

<script>
import { apiConfig } from '@/utils/config'
import Icon from '@/components/common/Icon'
import Slide from '@/components/website/Slide'

export default {
  components: {
    Icon,
    Slide
  },
  props: {
    projects: {
      type: Array,
      required: true
    },
    isMobile: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      slidesIndex: 0,
      apiConfig,
      projectsList: this.projects,
      throttleSlide: this.throttle(this.nextSlide, 1000)
    }
  },
  created () {
    if (this.projects.length === 2) {
      this.projectsList = [
        ...this.projects,
        ...this.projects
      ]
    }
  },
  mounted () {
    // this.throttleSlide = this.throttle(this.nextSlide, 1000)

    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 39) {
        this.throttleSlide()
      }
    })
  },
  methods: {
    throttle (callback, limit) {
      let wait = false

      return () => {
        if (!wait) {
          callback.call()
          wait = true
          setTimeout(() => {
            wait = false
          }, limit)
        }
      }
    },
    nextSlide () {
      if (this.projectsList[this.slidesIndex + 1]) {
        this.slidesIndex = this.slidesIndex + 1
      } else {
        this.slidesIndex = 0
      }
    }
  }
}
</script>
<style src="./ProjectsSlider.scss" scoped lang='scss'></style>
