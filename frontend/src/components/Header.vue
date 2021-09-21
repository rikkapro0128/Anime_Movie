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
      <input type="text" placeholder="Tên anime?" />
      <button class="btn">
        Tìm kiếm
        <i class="fas fa-search"></i>
      </button>
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
          <router-link :to="'/user'+ select.path" :class="{ 'first': index === 0, 'last':  userSelectOption.length === index }" v-for="(select, index) in userSelectOption" :key="index">{{ select.name }}</router-link>
          <button @click="logout(), turnUserTool = false" class="last">Đăng xuất</button>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import helper from '../utils/helperToken.js';
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
    const logout = async () => {
        await store.dispatch('sendDataSign', { dataForm: { id_user: JSON.parse(localStorage.getItem("id_user")), type: 'sign-out' }});
        localStorage.clear();
        helper.clearToken();
        router.push('/');
        isLogin.value = false;
    }
    watch(
        () => route.path,
        () => {
            isLogin.value = JSON.parse(localStorage.getItem("isLogin"));
            isAdmin.value = JSON.parse(localStorage.getItem("isAdmin"));
            nameUser.value = JSON.parse(localStorage.getItem("nameUser"));
        }
    )
    const lsChoose = ref([
      { name: "Trang Chủ", path: "" },
      { name: "Thể Loại", path: "the-loai" },
      { name: "Top Anime", path: "top-anime" },
      { name: "Lịch Chiếu", path: "lich-chieu" },
      { name: "Thông Tin", path: "thong-tin" },
    ]);
    const userSelectOption = ref([
      { name: 'Thông tin của bạn', path: '/thong-tin-cua-ban' },
      { name: 'Tin nhắn', path: '/' },
      { name: 'Đổi mật khẩu', path: '/' },
      { name: 'Nhóm Chat', path: '/' },
      { name: 'Hộp phim', path: '/' },
    ])
    return {
      store,
      logout,
      isAdmin,
      isLogin,
      nameUser,
      lsChoose,
      turnUserTool,
      userSelectOption,
    };
  },
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
          border-radius: 10px;
          transform: skew(-8deg, 0);
          .brigde {
            width: 100%;
            height: 10px;
            position: absolute;
            right: 0;
            top: -10px;
          }
          .first {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          }
          .last {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          a, button {
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
