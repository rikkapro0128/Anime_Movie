<template>
  <div class="movie">
    <div class="movie__details">
      <div class="movie__details--img">
        <img
          :src="
            movie.image
              ? `${host}${movie.image}`
              : `${host}/res-image/no_image.png`
          "
          :alt="
            movie.image
              ? `${host}${movie.imag}`
              : `${host}/res-image/no_image.png`
          "
        />
      </div>
      <div class="movie__details--content">
        <h1 class="">
          <span>Tên Anime :</span>
          {{ movie.name }}
        </h1>
        <h3>
          <span>Mô tả :</span>
          {{ movie.desc }}
        </h3>
      </div>
    </div>
    <div class="tool">
      <div class="ls-btn">
        <router-link
          class="btn box__sd--pink"
          :to="`${
            !movie.videos?.length
              ? '/'
              : `/view-movie/${label}?esp=${movie.videos?.[0]?.esp}`
          }`"
          >Xem Anime</router-link
        >
        <router-link class="btn box__sd--pink" to="/">Xem Trailer</router-link>
      </div>
      <div class="esp box__sd--pink">
        <h1>Tập</h1>
        <div v-if="movie.videos?.length" class="esp--ls">
          <router-link
            v-for="(video, index) in movie.videos"
            :key="index"
            class="btn btn--esp"
            :to="`/view-movie/${label}?esp=${video.esp}`"
            >{{ video.esp }}</router-link
          >
        </div>
        <span v-else>Vẫn chưa cập nhật tập nào!</span>
      </div>
    </div>
    <hr />
    <h1>Giao diện comment vẫn chưa hoàn tất!</h1>
    <hr />
    <Comments :label="label" />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import Comments from "../components/Comments.vue";
export default {
  props: ["name_movie"],
  components: { Comments },
  setup() {
    const route = useRoute();
    const label = ref(route.params.label_anime);
    const store = useStore();
    const movie = ref({});
    const host = ref(process.env.VUE_APP_HOST_SERVER);
    (async () => {
      await store.dispatch("getMovieByLabel", {
        label: label.value,
        options: { esp: "all" },
      });
      movie.value = store.state.movie;
    })();
    return {
      host,
      label,
      store,
      movie,
    };
  },
};
</script>

<style lang="scss" scoped>
.movie {
  width: inherit;
  margin: 2rem 0;
  padding: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: $light;
  @include tl-ani;
  &__details {
    display: flex;
    height: 18rem;
    &--img {
      min-width: 14rem;
      height: 100%;
      box-shadow: 0 0 10px $border-avatar;
      border-radius: 10px;
      img {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        border: 2px solid $border-avatar;
      }
    }
    &--content {
      margin-left: 1rem;
      height: 100%;
      h1 {
        color: $base-color;
        font-size: 1.3rem;
        text-transform: capitalize;
        span {
          font-size: 1.4rem;
          color: $main-color;
        }
      }
      h3 {
        color: $base-color;
        margin: 1rem 0;
        font-size: 1.2rem;
        line-height: 1.6rem;
        max-height: calc(100% - 3.3rem);
        overflow-y: scroll;
        span {
          font-size: 1.2rem;
          color: $main-color;
        }
      }
    }
  }
  .tool {
    display: flex;
    margin: 1rem 0;
    width: 100%;
    .ls-btn {
      display: flex;
      min-width: 14rem;
      justify-content: space-around;
      a {
        margin: 0 0.2rem;
      }
    }
    .esp {
      width: 100%;
      margin-left: 1rem;
      background-color: $main-color;
      border-radius: 10px;
      &--ls {
        display: flex;
        margin: 0 2rem;
        padding: 0.5rem 0;
        flex-wrap: wrap;
      }
      h1 {
        font-size: 1.2rem;
        color: $light;
        white-space: nowrap;
        margin: 0.5rem 1rem;
        margin-bottom: 0;
        margin-left: 2rem;
      }
      span {
        width: 100%;
        display: block;
        text-align: center;
        font-size: 1.2rem;
        color: $light;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
