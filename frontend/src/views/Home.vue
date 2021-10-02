<template>
  <section class="content">
    <h1 class="tl-ani ls-anime">
      <span><i class="fas fa-heart"></i></span>
      Danh sách Anime
    </h1>
    <div class="ls-card">
      <Card
        v-for="(movie, index) in movies"
        v-bind:key="index"
        v-bind:movie="movie"
      />
    </div>
  </section>
  <TooltipMovie />
</template>

<script>
import Card from "../components/Card.vue";
import TooltipMovie from "../components/TooltipMovie.vue";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Content",
  components: { Card, TooltipMovie },
  setup() {
    const store = useStore();
    const movies = ref([]);
    (async () => {
      await store.dispatch("getMovies");
      movies.value = store.state.movies;
    })();
    return {
      movies,
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: inherit;
  margin: 1rem 0;
  @include tl-ani;
  .ls-card {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
    padding: 1rem 0;
  }
}
</style>
