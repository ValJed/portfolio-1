<template>
  <li class="project-card">
    <h2>{{ project.name }}</h2>
    <div class="btn-container">
      <button
        @click="selectProject(project)"
      >
        Update
      </button>
      <button @click="deleteProject(project._id)">
        Delete
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
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

<style lang="scss" src="./ProjectCard.scss" />
