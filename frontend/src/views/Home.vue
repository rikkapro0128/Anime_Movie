<template>
  <section class="content">
    <LsMovie />
  </section>
</template>

<script>
// import { ref, reactive } from "vue";
// import { useStore } from "vuex";
import LsMovie from "../components/LS-Movie.vue";
export default {
  name: "Content",
  components: {
    LsMovie
  },
  setup() {
    return {};
  }
};
</script>
