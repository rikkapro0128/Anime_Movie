<template>
  <header>
    <ul class="nav">
      <li class="nav__item" v-for="item in lsChoose" v-bind:key="item">
        <span class="nav__item--scan"></span>
        <router-link :to="'/' + item.path">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <div class="space">
      <input type="text" v-model="keywords" placeholder="Tên anime?" />
      <button class="btn">
        Tìm kiếm
        <i class="fas fa-search"></i>
      </button>
      <div class="result--search" v-if="keywords">
        <span class="result--search__none" v-if="!searchAnimed.length"
          >Website hiện không có Anime này!</span
        >
        <div class="result" v-for="(item, index) in searchAnimed" :key="index">
          <hr v-if="index" />
          <div
            class="result--info"
            @click="
              this.$router.push({
                name: 'movie-by-label',
                params: {
                  label_anime: item.label
                }
              }),
                cancelSearch()
            "
            :class="{
              first: index === 0,
              last: index === searchAnimed.length - 1
            }"
          >
            <div class="result--info__image">
              <img
                v-if="item.image"
                :src="host + item.image"
                :alt="item.name"
              />
              <img
                v-else
                :src="host + '/res-image/no_image.png'"
                alt="no-image"
              />
            </div>
            <div class="result--info__details">
              <span class="result--info__details-name">{{ item.name }}</span>
              <span class="result--info__details-desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
        <div class="result--search__close zoom" @click="cancelSearch()">
          X
        </div>
      </div>
    </div>
    <ul class="nav">
      <li class="nav__item" v-if="!isLogin">
        <span class="nav__item--scan"></span>
        <router-link to="/dang-nhap">Đăng nhập</router-link>
      </li>
      <li class="nav__item" v-if="!isLogin">
        <span class="nav__item--scan"></span>
        <router-link to="/dang-ky">Đăng ký</router-link>
      </li>
      <li class="nav__item" v-if="isAdmin">
        <span class="nav__item--scan"></span>
        <router-link :to="`/admin/danh-sach-anime`">Quản lí</router-link>
      </li>
      <li class="nav__item user__tool last--nav-item" v-if="isLogin">
        <span class="nav__item--scan"></span>
        <p
          @click="turnUserTool = !turnUserTool"
          @mouseenter="turnUserTool = true"
          @mouseleave="turnUserTool = false"
        >
          {{ nameUser }}
        </p>
        <div
          class="user__tool--select"
          v-if="turnUserTool"
          @mouseleave="turnUserTool = false"
        >
          <div class="brigde" @mouseenter="turnUserTool = true"></div>
          <router-link
            :to="'/user' + select.path"
            :class="{
              first: index === 0,
              last: userSelectOption.length === index
            }"
            v-for="(select, index) in userSelectOption"
            :key="index"
            >{{ select.name }}</router-link
          >
          <button @click="logout(), (turnUserTool = false)" class="last">
            Đăng xuất
          </button>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import helper from "../utils/helperToken.js";
import { initFbsdk } from "../utils/loginFacebook.js";
import { capitalize } from "../utils/common.js";
// import anime from "animejs";
export default {
  name: "Header",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isLogin = ref(JSON.parse(localStorage.getItem("isLogin")));
    const isAdmin = ref(JSON.parse(localStorage.getItem("isAdmin")) || false);
    const nameUser = ref(JSON.parse(localStorage.getItem("nameUser")));
    const turnUserTool = ref(false);
    const keywords = ref("");
    const searchAnimed = ref([]);
    const host = ref(process.env.VUE_APP_HOST_SERVER);
    const lsChoose = ref([
      { name: "Trang Chủ", path: "" },
      { name: "Thể Loại", path: "the-loai" },
      { name: "Top Anime", path: "top-anime" },
      { name: "Lịch Chiếu", path: "lich-chieu" },
      { name: "Thông Tin", path: "thong-tin" }
    ]);
    const userSelectOption = ref([
      { name: "Thông tin của bạn", path: "/thong-tin-cua-ban" },
      { name: "Tin nhắn", path: "/" },
      { name: "Đổi mật khẩu", path: "/" },
      { name: "Nhóm Chat", path: "/" },
      { name: "Hộp phim", path: "/" }
    ]);
    initFbsdk();
    const logout = async () => {
      const authType = JSON.parse(localStorage.getItem("authType"));
      await store.dispatch("sendDataSign", {
        dataForm: {
          id_user: JSON.parse(localStorage.getItem("id_user")),
          type: "sign-out"
        }
      });
      if (authType === "facebook") {
        window.FB.getLoginStatus(function(res) {
          if (res.status === "connected") {
            window.FB.logout();
          }
        });
      }
      localStorage.clear();
      helper.clearToken();
      router.push("/");
      isLogin.value = false;
    };
    watch(
      () => route.path,
      () => {
        isLogin.value = JSON.parse(localStorage.getItem("isLogin"));
        isAdmin.value = JSON.parse(localStorage.getItem("isAdmin"));
        nameUser.value = JSON.parse(localStorage.getItem("nameUser"));
      }
    );
    watch(
      () => keywords.value,
      async () => {
        const lsAnime = await store.dispatch("searchAnime", {
          keys: capitalize(keywords.value)
        });
        searchAnimed.value = lsAnime;
      }
    );
    return {
      host,
      store,
      logout,
      isAdmin,
      isLogin,
      keywords,
      nameUser,
      lsChoose,
      searchAnimed,
      turnUserTool,
      userSelectOption
    };
  },
  methods: {
    cancelSearch() {
      this.searchAnimed = [];
      this.keywords = "";
    },
    moveBox() {}
  }
};
</script>

<style lang="scss">
header {
  width: inherit;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 10px $main-color;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: $main-color;
  position: sticky;
  top: 0;
  z-index: 3;
  .space {
    display: inline-block;
    width: 100%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: #fff;
    position: relative;
    display: flex;
    align-items: center;
    input {
      display: inline-block;
      padding: 0.3rem 1rem;
      outline: none;
      border: 2px dotted $main-color;
      border-radius: 20px;
      width: 100%;
      margin: 0 0.5rem;
      font-size: 1.2rem;
      color: $base-color;
      font-weight: 600;
      font-style: italic;
      &::placeholder {
        color: #ccc;
      }
    }
    button {
      margin-right: 0.5rem;
      padding: 0.5rem;
      border-top-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    .result--search {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: $light;
      border: 2px solid $main-color;
      border-radius: 1rem;
      transform: translateY(1rem);
      box-sizing: border-box;
      .result .first {
        border-top-left-radius: 0.8rem;
        border-top-right-radius: 0.8rem;
      }
      .result .last {
        border-bottom-left-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
      }
      .result {
        hr {
          width: 95%;
        }
        &--info {
          display: flex;
          padding: 0.5rem;
          transition: all 0.1s ease-in-out;
          cursor: pointer;
          &:hover {
            background-color: rgb(241, 241, 241);
          }
          &__image {
            width: 4rem;
            img {
              width: 4rem;
              border-radius: 0.8rem;
              border: 1px solid $main-color;
              object-fit: cover;
            }
          }
          &__details {
            margin-left: 0.5rem;
            span {
              display: block;
            }
            &-name {
            }
            &-desc {
              width: 100%;
              font-size: 1rem;
              font-style: italic;
              display: -webkit-box !important;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }
        }
      }
      &__none {
        display: block;
        padding: 1.5rem;
        text-align: center;
        color: $base-color;
      }
      &__close {
        position: absolute;
        width: 4rem;
        height: 4rem;
        border: 2px solid $main-color;
        background-color: $light;
        border-radius: 50%;
        left: 100%;
        top: 50%;
        transform: translate(1rem, -50%);
        font-family: "Roboto", sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 2rem;
        color: $base-color;
        cursor: pointer;
        transition: transform 0.1s ease-in-out;
        &:hover {
          transform: translate(1rem, -50%) scale(1.05);
        }
        &::before {
          content: "";
          display: block;
          position: absolute;
          width: 3.5rem;
          height: 3.5rem;
          background-color: transparent;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px dotted $main-color;
          border-radius: 50%;
        }
      }
    }
  }
  .nav {
    display: flex;
    &__item {
      background-color: $main-color;
      position: relative;
      cursor: pointer;
      &:first-child {
        border-bottom-left-radius: 20px;
      }
      &:last-child {
        border-bottom-right-radius: 20px;
      }
      &.last--nav-item {
        border-bottom-right-radius: 20px;
      }
      a,
      p {
        position: relative;
        display: block;
        color: #fff;
        text-decoration: none;
        padding: 1rem 1rem;
        z-index: 2;
        transition: color 0.15s ease-in-out;
        white-space: nowrap;
      }
      &--scan {
        position: absolute;
        width: 100%;
        height: 6px;
        z-index: 1;
        transition: height 0.2s ease-in-out;
      }
      span {
        background-color: #fff;
      }
      &:not(:last-child) {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          height: 50%;
          width: 1px;
          background-color: $base-color;
          top: 0;
          right: -1px;
          transform: translateY(50%);
          z-index: 2;
        }
      }
      &:hover {
        span {
          height: 100%;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
        }
        a,
        p {
          color: $base-color;
        }
      }
      .user__tool {
        position: relative;
        &--select {
          box-shadow: 0 0 10px $base-color;
          border: 2px solid $base-color;
          position: absolute;
          bottom: calc(-100% - 10px);
          right: 0;
          display: flex;
          border-radius: 0.8rem;
          transform: skew(-8deg, 0);
          .brigde {
            width: 100%;
            height: 10px;
            position: absolute;
            right: 0;
            top: -10px;
          }
          .first {
            border-top-left-radius: 0.6rem;
            border-bottom-left-radius: 0.6rem;
          }
          .last {
            border-top-right-radius: 0.6rem;
            border-bottom-right-radius: 0.6rem;
          }
          a,
          button {
            display: block;
            background-color: $main-color;
            transition: all 0.1s ease-in-out;
            color: $light;
            cursor: pointer;
            &:hover {
              color: $base-color;
              background-color: $light;
            }
          }
          button {
            border: none;
          }
        }
      }
    }
  }
}
</style>
