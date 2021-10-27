<template>
  <div class="tool--selection">
    <span class="tool--selection__name"><i class="fas fa-cog"></i></span>
    <div
      class="tool--selection__circle"
      @click="(open = !open), openTool($event.target)"
    ></div>
    <p class="ele--1">lên top</p>
    <p class="ele--2">xuống dưới</p>
    <p class="ele--3">lịch sử xem</p>
    <p class="ele--4">hội nhóm</p>
    <p class="ele--5">ẩn tool</p>
  </div>
</template>

<script>
import anime from "animejs";
import { ref, onMounted } from "vue";
export default {
  setup() {
    const open = ref(false);
    const choosePos = ref([
      [-90, -45, 0, 45, 90],
      [-50, -100, -120, -100, -50]
    ]);
    onMounted(() => {
      // init status starts by openTool
      anime({
        targets: ".tool--selection",
        opacity: 1,
        delay: 2000
      });
      anime({
        targets: ".tool--selection p",
        opacity: 0
      });
    });
    return { open, choosePos };
  },
  methods: {
    openTool(selector) {
      const context = this;
      if (this.open) {
        // openTool circle = 2
        anime({
          targets: selector,
          scale: 2,
          duration: 1000
        });
        // generater selector by circle
        anime({
          targets: ".tool--selection p",
          opacity: 1,
          translateY: function(el, i) {
            return context.choosePos[0][i];
          },
          translateX: function(el, i) {
            return context.choosePos[1][i];
          },
          delay: anime.stagger(100, { start: 200 })
        });
      } else {
        this.closeTool(selector);
      }
    },
    closeTool(selector) {
      // off scal circle = 2
      anime({
        targets: selector,
        scale: 1
      });
      // turn off all tag p selector
      anime({
        targets: ".tool--selection p",
        translateX: 0,
        translateY: 0,
        opacity: 0,
        delay: anime.stagger(100, { start: 200 })
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tool--selection {
  position: sticky;
  bottom: 10rem;
  left: 100%;
  width: 4rem;
  height: 4rem;
  opacity: 0;
  box-shadow: 0 0 10px #78ffd6;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  z-index: 1;
  &__name {
    position: absolute;
    color: $light;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, #007991 0%, #78ffd6 100%);
    padding: 1.3rem;
    border-radius: 50%;
  }
  &__circle {
    position: absolute;
    top: -4px;
    left: -4px;
    border: 1px solid #78ffd6;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    padding: 2px;
    border-right-color: transparent;
  }
  p {
    position: absolute;
    z-index: -1;
    font-family: "IBM Plex Sans", sans-serif;
    transition: font-size 0.2s ease-in-out;
    text-transform: capitalize;
    color: $light;
    font-weight: 600;
    font-style: italic;
    white-space: nowrap;
    &:hover {
      font-size: 1.4rem;
    }
  }
}
</style>
