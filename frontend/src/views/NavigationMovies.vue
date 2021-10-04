<template>
  <section class="navigation-movies">
    <LsMovie />
  </section>
</template>

<script>
import LsMovie from "../components/LS-Movie.vue";
export default {
  components: { LsMovie }
};
</script>

<style lang="scss" scoped>
.navigation-movies {
  width: inherit;
}
</style>
