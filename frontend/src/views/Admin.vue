<template>
  <div class="admin">
    <h1 class="tl-ani">Quản lí</h1>
    <div class="admin__sidebar">
      <div class="admin__sidebar--left">
        <div
          class="box__sd--pink"
          v-for="(option, index) in optionSideBar"
          :key="index"
        >
          <router-link :to="`/admin/${option.path}`">{{
            option.name
          }}</router-link>
        </div>
        <!-- <input type="file" accept="image/*" :multiple="false" @change="addFile($event)"> -->
      </div>
      <div class="admin__sidebar--right">
        <router-view v-slot="{ Component, route }">
          <!-- Use any custom transition and fallback to `fade` -->
          <transition :name="route.meta.transition || 'fade'">
            <component :key="$route.fullPath" :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const routedemo = ref(null);
    const optionSideBar = ref([
      { name: "Danh sách anime", path: "danh-sach-anime" },
      { name: "Phản hồi", path: "phan-hoi" },
      { name: "Thêm Phim", path: "them-anime" }
    ]);
    return {
      routedemo,
      optionSideBar
    };
  },
  beforeRouteEnter(to, from, next) {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    if (!isAdmin) {
      next({ name: "404-not-found" });
    } else {
      next();
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.admin {
  margin: 2rem 0;
  @include tl-ani;
  overflow: hidden;
  width: inherit;
  &__sidebar {
    display: flex;
    margin-top: 0.2rem;
    width: 100%;
    background-color: transparent;
    &--left {
      div {
        margin: 0.4rem;
        border: 2px solid $main-color;
        border-radius: 20px;
        background-color: #fff;
        transition: all 0.1s ease-in-out;
        a {
          transition: color 0.1s ease-in-out;
          display: block;
          color: $main-color;
          text-decoration: none;
          padding: 0.6rem 0.8rem;
          white-space: nowrap;
        }
        &:hover {
          background-color: $main-color;
          border-color: $main-color;
          a {
            color: #fff;
          }
        }
      }
    }
    &--right {
      margin-left: 1rem;
      width: inherit;
    }
  }
}
</style>
