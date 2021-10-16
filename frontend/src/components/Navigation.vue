<template>
  <div class="navigation">
    <span
      class="nav--prev btn btn--tool"
      @click="handleClickNav(navPresent - 1)"
      v-if="navPresent > 1"
      >Lùi</span
    >
    <span
      @click="handleClickNav(navIndex)"
      class="ls-index btn btn--tool"
      v-for="(navIndex, index) in navLength"
      :key="index"
      >{{ navIndex }}</span
    >
    <span
      class="nav--prev btn btn--tool"
      @click="handleClickNav(navPresent + 1)"
      v-if="navPresent < navLength"
      >Tiến</span
    >
  </div>
</template>

<script>
export default {
  emits: ["changeIndexOfNav"],
  props: {
    navLength: {
      type: Number,
    },
    navPresent: {
      type: Number,
      default: 0
    }
  },
  setup() {},
  methods: {
    handleClickNav(index) {
      if (index === this.navPresent || index < 0 || index > this.navLength) {
        return;
      }
      this.$emit("changeIndexOfNav", { index });
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  margin: 1rem auto;
  text-align: center;
}
</style>
