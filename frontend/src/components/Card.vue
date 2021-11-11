<template>
  <div
    class="card box__sd"
    @mouseenter="showTooltip = true, isHover = true"
    @mouseleave="showTooltip = false, isHover = false"
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
    <span class="card__label"></span>
    <div class="card__play" :class="{ hover: isHover }">
			<span class="node"></span>
			<span class="run--auto"></span>
			<span class="run--auto"></span>
			<span class="run--auto"></span>
		</div>
    <span class="card__name">{{ movie.name }}</span>
    <span class="spin">{{
      movie?.videos ? movie.videos[movie.videos.length - 1]?.esp || 0 : 0
    }}</span>
    <TooltipMovie :coordinate="coordinate" :movie="movie" v-if="showTooltip" />
  </div>
</template>

<script>
import TooltipMovie from "./TooltipMovie.vue";
import { ref, reactive } from "vue";
export default {
  name: "Card",
  props: {
    movie: {
      type: Object
    }
  },
  emits: ["changeStateTooltip", "changeCoordinateTooltip"],
  components: { TooltipMovie },
  setup() {
    const showTooltip = ref(false);
    const host = ref(process.env.VUE_APP_HOST_SERVER);
    const coordinate = reactive({ x: 0, y: 0 });
		const isHover = ref(false);
    return {
      host,
			isHover,
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
