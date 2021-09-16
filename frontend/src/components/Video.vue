<template>
  <div>
    <video
      ref="videoPlayer"
      id="mv-player"
      class="video-js"
      width="960"
      controls
      preload="auto"
      :src="`http://localhost:5000${link_mv}`"
      type="video/*"
      :autopictureinpicture="true"
      @waiting="loading()"
      @canplay="loaded()"
      @loadedmetadata="loaded()"
    ></video>
    <div class="loading" v-if="state"></div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    link_mv: {
      type: String,
    },
  },
  setup() {
    const state = ref(true);
    return {
      state,
    }
  }
  ,
  methods: {
    loading() {
      this.state = true;
    },
    loaded() {
      this.state = false;
    },
  }
};
</script>

<style scoped lang="scss">
  div {
    width: fit-content;
    margin: 0 auto;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    video {
      display: block;
    }
    .loading {
      width: 16rem;
      height: 18.75rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-image: url('~@/assets/img/loading.gif');
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
</style>
