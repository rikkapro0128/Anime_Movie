<template>
  <div class="ani--view" :style="{ 'z-index': showOverlayDark ? 4 : 1 }">
    <!-- video element -->
    <vue-plyr ref="player_ani">
      <video :id="idVideo"
        width="960"
        height="540"
        controls
        crossorigin
        playsinline
        preload="auto"
        size="720"
        :src="`http://localhost:5000${link_mv.currentLink}`"
        type="video/*"
        data-poster="https://i.pinimg.com/originals/23/d6/12/23d6122575e29debe94262e54d1ec09b.png"
      >
      </video>
    </vue-plyr>
    <div class="loading" v-if="state"></div>
  </div>
  <div class="tool">
    <router-link class="btn btn--tool" :to="link_mv.nextLink" @click="turnWatch ? showPopup = true : null">Tập tiếp theo</router-link>
    <button class="btn btn--tool">Theo dõi</button>
    <button class="btn btn--tool" @click="showModalTakePicture = !showModalTakePicture">Chụp ảnh</button>
    <button class="btn btn--tool" @click="showOverlayDark = !showOverlayDark">Tắt đèn</button>
    <button class="btn btn--tool">Xem bình luận</button>
    <button class="btn btn--tool" @click="$refs.player_ani.player.currentTime -= 5">Tua ngược 5s</button>
    <button class="btn btn--tool" @click="$refs.player_ani.player.currentTime += 5">Tua nhanh 5s</button>
  </div>
  <Popup :toggle="showPopup" @changeToggle="showPopup = !showPopup" />
  <Overlay :toggle="showOverlayDark" @changeToggle="showOverlayDark = !showOverlayDark" />
  <ScreenVideo :toggle="showModalTakePicture" :idVideo="idVideo" @changeToggle="showModalTakePicture = !showModalTakePicture" />
</template>

<script>
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import Overlay from './Overlay.vue';
import Popup from './Popup.vue';
import ScreenVideo from './ScreenVideo.vue';
export default {
  props: {
    link_mv: {
      type: Object,
    },
  },
  components: {
    Popup,
    Overlay,
    ScreenVideo,
  },
  setup() {
    const route = useRoute();
    const state = ref(false);
    const showPopup = ref(false);
    const turnWatch = ref(false);
    const showOverlayDark = ref(false);
    const showModalTakePicture = ref(false);
    const idVideo = ref('video_ani');
    watch(() => route.query.esp, (esp) => {
        if(!esp && route.name === 'view-movie') {
          showPopup.value = true;
          state.value = false;
          turnWatch.value = true;
        }
    })
    return {
      state,
      idVideo,
      turnWatch,
      showPopup,
      showOverlayDark,
      showModalTakePicture,
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
  method: {

  }
};
</script>

<style scoped lang="scss">
  .ani--view {
    width: fit-content;
    margin: 0 1rem;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    width: initial;
    aspect-ratio: 16 / 9;
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
  .tool {
    padding: 1rem 1rem;
    margin-right: -0.5rem;
    margin-left: -0.5rem;
    margin-bottom: -0.5rem;
    text-align: center;
  }
</style>
