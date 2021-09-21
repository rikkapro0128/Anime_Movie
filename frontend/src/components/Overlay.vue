<template>
  <teleport v-if="toggle" to="body">
    <div class="overlay-dark" @click="$emit('changeToggle')" :style="{ backgroundColor: color_ol ? color_ol : '#000000f2', }" ></div>
  </teleport>
</template>

<script>
export default {
  emits: ['changeToggle'],
  props: {
      toggle: {
          type: Boolean,
      },
      color_ol: {
        type: String,
      } 
  },
}
</script>

<style lang="scss" scoped>
  .overlay-dark {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
  }
</style>
