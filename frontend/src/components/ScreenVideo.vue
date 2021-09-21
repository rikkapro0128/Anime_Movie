<template>
    <teleport v-if="toggle" to=".container">
      <div class="take-pic--ani">
        <span>
          <button class="btn btn--tool" @click="$emit('changeToggle')">Thoát</button>
          Bạn có thể nhấp chuột phải để save ảnh bạn vừa chụp!
        </span>
        <canvas ref="ani_canvas"></canvas>
      </div>
  </teleport>
</template>

<script>
export default {
  emits: ['changeToggle'],
  props: {
      toggle: {
          type: Boolean,
      },
      idVideo: {
          type: String,
      },
  },
  updated() {
    if(this.toggle) { this.getImage() }
  },
  methods: {
    getImage() {
      const video = document.querySelector(`#${this.idVideo}`);
      const canvas = this.$refs.ani_canvas;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  },
}
</script>

<style lang="scss" scoped>
  .take-pic--ani {
    max-width: 100%;
    height: fit-content;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: $main-color;
    box-shadow: 0 0 10px $main-color;
    border-radius: 5px;
    z-index: 1;
    span {
      color: $base-color;
      display: block;
      font-size: 1.4rem;
      margin: 1rem 2rem;
      white-space: nowrap;
    }
    canvas {
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 5px;
    }
  }
</style>
