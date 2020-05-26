
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
    width: {
      default: null,
      type: String,
      required: false
    },
    height: {
      default: null,
      type: String,
      required: false
    },
    fill: {
      default: null,
      type: String,
      required: false
    },
    stroke: {
      default: null,
      type: String,
      required: false
    }
  },
  data () {
    return {
      iconStyle: {
        ...(this.width && { width: this.width }),
        ...(this.height && { height: this.height })
      },
      svgStyle: {
        ...(this.fill && { fill: this.fill }),
        ...(this.stroke && { stroke: this.stroke })
      }
    }
  }
}
</script>

<style src="./Icon.scss" scoped lang='scss'></style>
