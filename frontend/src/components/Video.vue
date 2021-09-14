<template>
  <video
    ref="videoPlayer"
    id="mv-player"
    class="video-js"
    width="960"
    controls
    preload="auto"
    :src="`http://localhost:5000${link_mv}`"
    type="video/*"
  ></video>
</template>

<script>
export default {
  props: {
    link_mv: {
      type: String,
    },
  },
};
</script>

<style scoped>
</style>
