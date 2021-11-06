<template>
  <div
    class="check-box"
    :class="{ active: stateCheck }"
    :position-checkbox="checkboxPos"
    @click="stateCheck = !stateCheck, changeCheckBox(stateCheck)"
  >
    <i class="fas fa-plus"></i>
    <span class="check-box__name" :title="name">{{ name }}</span>
  </div>
</template>

<script>
import { ref } from "vue";
import anime from "animejs";

export default {
  props: {
    checkboxPos: {
      type: Number,
    },
    name: {
      type: String,
    },
		valueCheckBox: {
      type: Boolean,
    },
  },
	watch: {
		valueCheckBox: function (newValue) {
			if(!this.doneDefault && newValue) {
				this.stateCheck = true;
				this.spinElement(this.stateCheck);
				this.doneDefault = true;
			}
		}
	},
	setup() {
    const stateCheck = ref(null);
    const doneDefault = ref(false);
    return { stateCheck, doneDefault };
  },
  methods: {
    changeCheckBox(value) {
      // change spin
      this.spinElement(value);
      // emit toggle checkbox
      this.$emit("ChangeCheckBox", { name: this.$props.name, value });
    },
		spinElement(value) {
			anime({
				targets: `.check-box[position-checkbox="${this.$props.checkboxPos}"] i`,
				rotate: value ? 45 : 0,
			});
		}
  },
};
</script>

<style lang="scss" scoped>
.check-box {
  padding: 0.5rem;
  background-color: $main-color;
  border-radius: 10px;
  border: 2px solid $border-checkbox;
  cursor: pointer;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  transition: box-shadow top left 0.2s ease-in-out;
  box-shadow: 2px 2px 0px $main-color;
  position: relative;
  &.active {
    box-shadow: 0px 0px 0px $main-color;
    top: 1px;
    left: 1px;
    span,
    i {
      color: $active-checkbox;
    }
  }
  span,
  i {
    color: $light;
    transition: color 0.1s ease-in-out;
  }
  i {
    font-size: 1rem;
  }
  &__name {
    text-align: end;
    margin-left: 0.5rem;
  }
}
</style>
