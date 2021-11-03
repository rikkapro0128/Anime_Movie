<template>
  <div class="input">
    <span v-if="setTitle">{{ name }}</span>
    <input :name="name" :type="type" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    setTitle: {
      type: Boolean,
    },
    placeholder: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  margin-left: 1rem;
  width: 100%;
  input {
    padding: 0.5rem;
    border: 2px solid $border-input;
    border-radius: 10px;
    box-shadow: 2px 2px 0px $main-color;
    outline: none;
    position: relative;
    font-size: 1rem;
    width: inherit;
    box-sizing: border-box;
    &:focus {
      box-shadow: 0px 0px 0px $main-color;
      left: 1px;
      top: 1px;
    }
    &::placeholder {
      text-transform: capitalize;
    }
  }
}
</style>
