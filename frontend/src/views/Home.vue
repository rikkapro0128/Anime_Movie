<template>
  <section class="content">
		<Slider />
    <LsMovie />
  </section>
</template>

<script>
// import { ref, reactive } from "vue";
// import { useStore } from "vuex";
import Slider from "../components/Slider.vue";
import LsMovie from "../components/LS-Movie.vue";
export default {
  name: "Content",
  components: {
		Slider,
    LsMovie,
  },
  setup() {
    return {};
  }
};
</script>
