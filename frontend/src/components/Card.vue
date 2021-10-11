<template>
  <div
    class="card box__sd"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
    @mousemove="readCoordinate($event)"
  >
    <router-link
      class="card__directly"
      :to="`/movie/${movie.label}`"
    ></router-link>
    <img
      class="card__img"
      :src="
        movie.image ? `${host}${movie.image}` : `${host}/res-image/no_image.png`
      "
      alt="card"
    />
    <span class="card__rate">9.8</span>
    <img class="card__play" src="~@/assets/img/playOv.png" alt="" />
    <span class="card__name">{{ movie.name }}</span>
    <span class="spin">{{
      movie?.videos ? movie.videos[movie.videos.length - 1]?.esp || 0 : 0
    }}</span>
    <!-- <TooltipMovie :coordinate="coordinate" :movie="movie" v-if="showTooltip" /> -->
  </div>
</template>

<script>
// import TooltipMovie from "./TooltipMovie.vue";
import { ref, reactive } from "vue";
export default {
  name: "Card",
  props: {
    movie: {
      type: Object
    }
  },
  emits: ["changeStateTooltip", "changeCoordinateTooltip"],
  // components: { TooltipMovie },
  setup() {
    const showTooltip = ref(false);
    const host = ref(process.env.VUE_APP_HOST_SERVER);
    const coordinate = reactive({ x: 0, y: 0 });
    return {
      host,
      coordinate,
      showTooltip
    };
  },
  methods: {
    readCoordinate(e) {
      this.coordinate.x = e.pageX;
      this.coordinate.y = e.pageY;
    }
  }
};
</script>

<style lang="scss">
@include card;
</style>
