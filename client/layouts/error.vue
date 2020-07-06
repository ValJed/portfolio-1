<template>
  <div class="container">
    <h1>This page could not be found !</h1>
  </div>
</template>

<script>

export default {
  date () {
    return {
      isMobile: false
    }
  },
  mounted () {
    // this.isMobile = window.innerWidth < 599
  }
}
</script>
<style src="./error.scss" scoped lang='scss'></style>
