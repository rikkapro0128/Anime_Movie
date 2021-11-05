<template>
  <div class="user">
    <h1 class="tl-ani">Trang cá nhân</h1>
    <div class="user__sidebar">
      <div class="user__sidebar--left">
        <div
          class="box__sd--pink"
          v-for="(option, index) in optionSideBar"
          :key="index"
        >
          <router-link :to="`/user/${option.path}`">{{
            option.name
          }}</router-link>
        </div>
      </div>
      <div class="user__sidebar--right">
        <router-view name="UserInfo"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const routedemo = ref(null);
    const store = useStore();
    const optionSideBar = ref([
      { name: "Thông tin của bạn", path: "thong-tin-cua-ban" },
      { name: "Tin nhắn", path: "" },
      { name: "Đổi mật khẩu", path: "" },
      { name: "Nhóm Chat", path: "" },
      { name: "Hộp phim", path: "" },
    ]);
    return {
      store,
      routedemo,
      optionSideBar,
    };
  },
  async beforeRouteEnter(to, from, next) {
    const isUser = JSON.parse(localStorage.getItem("isUser"));
    if (isUser) {
      next();
    } else {
      next({ name: "404-not-found" });
    }
  },
  methods: {
    showPopup() {},
  },
};
</script>

<style lang="scss" scoped>
.user {
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
