<template>
  <div class="select" :class="{ active: stateOpenSelect }">
    <div
      :class="'select--name' + ' ' + field"
      :style="{ 'z-index': order }"
      @click="stateOpenSelect = !stateOpenSelect"
    >
      <span class="content">{{ selectvalue ?? setDefaultValue ?? name }}</span>
      <i class="fas fa-caret-up"></i>
      <div class="select--name__popup" :class="{ active: stateOpenSelect }">
        <span @click="getvalueSelect(null)">bỏ chọn</span>
        <span
          v-for="(item, index) in dataSelect"
          :key="index"
          @click="getvalueSelect(item)"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import anime from "animejs";

export default {
  props: {
    name: {
      type: String,
    },
    dataSelect: {
      type: Object || Array,
    },
    field: {
      type: String,
    },
		defaultValue: {
			type: String || Number,
		}
  },
  setup(props, { emit }) {
		const setDefaultValue = ref(props.defaultValue);
    const stateOpenSelect = ref(false);
    const selectvalue = ref(undefined);
    const doneSelect = ref(false);
		const order = ref(0);
    watch(
      () => stateOpenSelect.value,
      (oldState) => {
        if (oldState) {
					emit('selectActive', props.field);
          activeSelect();
        } else {
          unActiveSelect();
        }
      }
    );
    function activeSelect() {
      anime({
        targets: `.select--name.${props.field} .select--name__popup`,
        translateY: ["105%", "101%"],
        opacity: 1,
      });
      anime({
        targets: `.select--name.${props.field} i`,
        rotate: ["0", "180"],
        duration: 500,
      });
    }
    function unActiveSelect() {
      anime({
        targets: `.select--name.${props.field} .select--name__popup`,
        translateY: ["101%", "105%"],
        opacity: 0,
      });
      anime({
        targets: `.select--name.${props.field} i`,
        rotate: ["180", "0"],
        duration: 500,
      });
    }
    return {
			order,
      doneSelect,
      selectvalue,
      stateOpenSelect,
			setDefaultValue,
    };
  },
  methods: {
    getvalueSelect(value) {
			if (this.selectvalue !== value) {
				if(this.setDefaultValue !== null) { this.setDefaultValue = null }
        this.selectvalue = value;
        this.$emit("changeSelect", { type: this.$props.field, value });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  margin: 0.5rem;
  &.active {
    & > div {
      box-shadow: 0px 0px 0px $main-color;
      top: 1px;
      left: 1px;
    }
  }
  &--name {
    padding: 0.5rem;
    min-width: 8.125rem;
    width: fit-content;
    background-color: $main-color;
    color: $light;
    border: 2px solid $bg-select;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    box-shadow: 2px 2px 0px $main-color;
    .content {
      text-transform: capitalize;
    }
    i {
      margin-left: 0.4rem;
    }
    &__popup {
      &.active {
        display: block;
      }
      position: absolute;
      bottom: -0.6rem;
      left: -2px;
      transform: translateY(100%);
      background-color: $main-color;
      border: 2px solid $main-color;
      width: 100%;
      border-radius: 10px;
      border: 2px solid $bg-select;
      opacity: 0;
      display: none;
      // transform: translateY(105%);
      span {
        text-transform: capitalize;
      }
      &::before {
        content: "";
        display: block;
        position: absolute;
        top: -1px;
        left: 20%;
        transform: translate(-50%, -50%) rotate(-45deg);
        border: 5px solid $bg-select;
        border-radius: 2px;
        border-left-color: transparent;
        border-bottom-color: transparent;
      }
      span {
        padding: 0.5rem;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:first-child {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        &:last-child {
          border-bottom-right-radius: 8px;
          border-bottom-left-radius: 8px;
        }
        &:hover {
          background-color: $bg-select;
        }
      }
    }
  }
}
</style>
