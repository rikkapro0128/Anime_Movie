<template>
  <teleport v-if="toggle" to="body">
    <div class="popup" :class="{ 'zoom-in': toggle, 'zoom-out': !toggle }">
      <span>Ara-ara!</span>
      <h1>{{ message ? message : "Hết tập mất rồi" }}</h1>
      <div>
        <router-link
          v-if="dontCallHome ? false : true"
          class="btn btn--tool"
          to="/"
          >Quay lại trang chủ</router-link
        >
        <button class="btn btn--tool" @click="$emit('changeToggle')">
          {{ dontCallHome ? "OK" : "Thoát" }}
        </button>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  emits: ["changeToggle"],
  props: {
    toggle: {
      type: Boolean,
    },
    dontCallHome: {
      type: Boolean,
    },
    message: {
      type: String,
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  width: 15rem;
  height: fit-content;
  top: 50%;
  left: 50%;
  transform: scale(0) translate(-50%, -50%);
  transform-origin: top left;
  background-color: $main-color;
  z-index: 3;
  font-family: "Patrick Hand", cursive;
  padding: 1rem 2rem;
  text-align: center;
  box-shadow: 0 0 10px $main-color;
  border-radius: 10px;
  background-image: url("~@/assets/img/bg_tr.png");
  background-size: 3%;
  &.zoom-in {
    animation: popupZoomIn 1 0.5s 0.1s ease-in-out forwards;
  }
  &.zoom-out {
    animation: popupZoomOut 1 1s ease-in-out forwards;
  }
  span {
    font-size: 1.7rem;
    color: #fff;
    display: block;
    margin: 1rem 0;
  }
  h1 {
    font-size: 1.4rem;
    color: $base-color;
    margin: 1rem 0;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
