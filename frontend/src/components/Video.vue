<template>
  <div>
    <!-- video element -->
    <vue-plyr ref="player_ani">
      <video
        width="960"
        height="540"
        controls
        crossorigin
        playsinline
        preload="auto"
        size="720"
        :src="`http://localhost:5000${link_mv}`"
        type="video/*"
        data-poster="https://i.pinimg.com/originals/23/d6/12/23d6122575e29debe94262e54d1ec09b.png"
      >
      </video>
    </vue-plyr>
    <div class="loading" v-if="state"></div>
  </div>
  <button @click="$refs.player_ani.player.currentTime -= 5">down second</button>
  <button @click="$refs.player_ani.player.currentTime += 5">up second</button>
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
    const state = ref(false);
    return {
      state,
    }
  },
  mounted () {
    this.$refs.player_ani.player.on('canplaythrough', () => {
      this.state = false;
    });
    this.$refs.player_ani.player.on('loadstart waiting', () => {
      this.state = true;
    });
  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
  div {
    width: fit-content;
    margin: 0 1rem;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    div {
      width: initial;
      aspect-ratio: 16 / 9;
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
