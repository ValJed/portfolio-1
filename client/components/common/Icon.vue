
<template>
  <div
    class="icon"
    :class="`icon--${name}`"
    :style="iconStyle"
  >
    <svg-icon
      class="icon__svg"
      :name="name"
      :style="svgStyle"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      default: '',
      type: String,
      required: true
    },
    size: {
      default: 0.8,
      type: Number,
      required: false
    },
    color: {
      default: '#000',
      type: String,
      required: false
    }
  },
  data () {
    return {
      iconStyle: {
        width: `${this.size}rem`,
        height: `${this.size}rem`
      },
      svgStyle: {
        fill: `${this.color}`
      }
    }
  }
}
</script>

<style src="./Icon.scss" scoped lang='scss'></style>
