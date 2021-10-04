<template>
  <div class="ls-movies">
    <h1 class="tl-ani ls-anime">
      <span><i class="fas fa-heart"></i></span>
      Danh sách Anime
    </h1>
    <div class="ls-card">
      <Card
        v-for="(movie, index) in $store.state.movies"
        v-bind:key="index"
        v-bind:movie="movie"
      />
    </div>
    <div class="pagination">
      <router-link
        :to="
          `page?num=${numPage > 0 ? numPage - 1 : 0}&rage=${
            $store.state.pagination.range
          }`
        "
        class="first btn"
      >
        Lùi
      </router-link>
      <router-link
        :to="`page?num=${page - 1}&rage=${$store.state.pagination.range}`"
        class="run-page btn"
        v-for="(page, index) in lengthPage"
        :key="index"
        :data-page="page - 1"
      >
        {{ page - 1 }}
      </router-link>
      <router-link
        :to="
          `page?num=${
            numPage + 1 < lengthPage ? numPage + 1 : lengthPage - 1
          }&rage=${$store.state.pagination.range}`
        "
        class="end btn"
      >
        Tiến
      </router-link>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  components: { Card },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const lengthPage = ref(0);
    const numPage = ref(0);
    if (route.name === "trang-chu") {
      numPage.value = 0;
    } else {
      numPage.value = parseInt(route.query.num);
    }
    const getMovie = async pagination => {
      if (pagination.lengthMovies === 0) {
        const state = await store.dispatch("getLengthMovies");
        if (!state) {
          router.push({ name: "404-not-found" });
        }
      }
      lengthPage.value = Math.ceil(
        store.state.pagination.lengthMovies / store.state.pagination.range
      );
      await store.dispatch("getMovies", {
        page: numPage.value,
        range: pagination.range
      });
    };
    watch(
      () => route.query.num,
      () => {
        if (route.query.num === 0) {
          numPage.value = 1;
        } else {
          numPage.value = parseInt(route.query.num);
        }
        getMovie(store.state.pagination);
      }
    );
    getMovie(store.state.pagination);
    return {
      numPage,
      getMovie,
      lengthPage
    };
  }
};
</script>

<style lang="scss" scoped>
.ls-movies {
  width: inherit;
  margin: 1rem 0;
  @include tl-ani;
  .ls-card {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
    padding: 1rem 0;
  }
  .pagination {
    display: flex;
    justify-content: center;
    a {
      margin: 0 0.2rem;
      padding: 0.6rem 1rem;
    }
  }
}
</style>
