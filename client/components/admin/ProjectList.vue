<template>
  <ul class="project-list">
    <project-card
      v-for="(project, index) in projects"
      :key="index"
      :project="project"
      :select-project="selectProject"
      :delete-project="deleteProject"
    />
  </ul>
</template>

<script>
import ProjectCard from './ProjectCard'

export default {
  components: {
    ProjectCard
  },
  props: {
    projects: {
      type: Array,
      required: true
    },
    selectProject: {
      type: Function,
      required: true
    },
    deleteProject: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="scss" src="./ProjectList.scss" />
