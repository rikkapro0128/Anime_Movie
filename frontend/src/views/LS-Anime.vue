<template>
  <div class="ls-ani">
    <h1 class="tl-ani">Danh Sách Anime</h1>
    <Navigation
      :navLength="initLoadLength"
      :navPresent="initLoadIndex"
      @changeIndexOfNav="handleChangeIndexOfNav"
    />
    <table>
      <tr>
        <th>STT</th>
        <th>Tên</th>
        <th>Tập hiện tại</th>
        <th>Xoá</th>
      </tr>
      <tr v-for="(data, index) in $store.state.movies" :key="index">
        <td class="stt">
          {{ (initLoadIndex - 1) * initRange + 1 + index }}
        </td>
        <td class="name">{{ data.name }}</td>
        <td class="eps">
          {{
            data.videos[data.videos.length - 1]
              ? data.videos[data.videos.length - 1].esp
              : 0
          }}
        </td>
        <router-link :to="`/admin/danh-sach-anime/${data.label}`"></router-link>
        <td @click="removeMovie(data.label)" class="remove hov-remove">
          <i class="far fa-trash-alt"></i>
        </td>
      </tr>
    </table>
    <h1 class="loading" v-if="!$store.state.movies.length">
      Đang tải danh sách...!
    </h1>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import Navigation from "../components/Navigation.vue";

export default {
  components: { Navigation },
  props: {},
  setup() {
    const store = useStore();
    const initLoadIndex = ref(1);
    const initLoadLength = ref(10);
    const initRange = ref(15);
    (async () => {
      if (!store.state.pagination.lengthMovies) {
        await store.dispatch("getLengthMovies");
      }
      await store.dispatch("getMovies", {
        page: initLoadIndex.value - 1,
        range: initRange.value
      });
      initLoadLength.value = Math.ceil(
        store.state.pagination.lengthMovies / initRange.value
      );
    })();
    return {
      store,
      initRange,
      initLoadIndex,
      initLoadLength
    };
  },
  methods: {
    async removeMovie(label) {
      await this.store.dispatch("removeMovieByLabel", {
        label,
        options: { select: "" }
      });
      this.changeDataCard = !this.changeDataCard;
    },
    async handleChangeIndexOfNav({ index }) {
      this.initLoadIndex = index;
      await this.store.dispatch("getMovies", {
        page: this.initLoadIndex - 1,
        range: this.initRange
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ls-ani {
  width: 100%;
  padding: 0.4rem;
  box-sizing: border-box;
}
</style>
