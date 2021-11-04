<template>
  <div>{{ data_1 }}</div>
  <button
    @click="
      () => {
        this.props.data_1++;
      }
    "
  >
    Up count component 1
  </button>
</template>

<script>
export default {
  props: {
    data_1: {
      type: Number,
    },
  },
};
</script>

<style></style>
