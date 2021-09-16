<template>
  <div class="wrap">
    <label :for="data.inputName">{{ data.labelName }}</label>
    <input
      :id="data.inputName"
      :type="data.type"
      :name="data.inputName"
      @blur="sendValueInput()"
      v-model="valueInput"
    />
    <span>{{ data.mess }}</span>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    data: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const valueInput = ref("");
    watch(
        () => valueInput.value,
        () => {
            emit("onChangeValueInput", {
                value: valueInput.value,
                field: props.data.inputName,
            });
        }
    )
    return {
      valueInput,
    };
  },
  methods: {
    sendValueInput() {
      this.$emit("onChangeValueInput", {
        value: this.valueInput,
        field: this.$props.data.inputName,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  margin: 1rem 0;
  label {
    display: block;
    font-size: 1.2rem;
    text-transform: capitalize;
    margin: 0.4rem 0;
    color: $base-color;
    font-weight: 600;
    font-style: italic;
    position: relative;
    z-index: 1;
  }
  input {
    display: block;
    border: 2px solid $base-color;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
    padding: 10px;
    width: 100%;
    color: $base-color;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease-in-out;
    position: relative;
    z-index: 1;
    background-color: #ffffffbd;
    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
  }
  span {
    display: block;
    font-size: 1rem;
    margin: 0.2rem 0;
    font-style: italic;
  }
}
</style>
