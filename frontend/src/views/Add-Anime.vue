<template>
  <div class="add-movie">
    <h1 class="tl-ani">Thêm phim</h1>
    <form action="" @submit.prevent="sendMovie">
      <div
        class="form-input"
        v-for="(item, index) in formAddMovie"
        :key="index"
      >
        <label :for="item.attr">{{ item.name }}</label>
        <input
          class="box-sd"
          :type="item.type"
          :name="item.attr"
          :id="item.attr"
          v-model="movieInfo.name"
					@blur="checkInput('name')"
					@input="checkInput('name')"
        />
      </div>
      <span class="validate-field" v-if="message.name">{{
					message.name
      }}</span>
      <div class="form-input">
        <label for="desc">Mô tả</label>
        <textarea
          class="box-sd"
          name="desc"
          id="desc"
          v-model="movieInfo.desc"
					@blur="checkInput('desc')"
					@input="checkInput('desc')"
        ></textarea>
      </div>
      <span class="validate-field" v-if="message.desc">{{
					message.desc
      }}</span>
      <button class="box-sd">Đăng</button>
      <span v-if="stateSending" class="status-send">đang tạo phim vui lòng chờ!</span>
      <span v-if="stateDone" class="status-done">tạo phim thành công</span>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const stateSending = ref(false);
		const permitSend = ref(false);
    const stateDone = ref(false);
    const message = reactive({ name: undefined, desc: undefined });
    const formAddMovie = reactive([
      {
        name: "Tên",
        attr: "name",
        data: "",
        type: "text"
      }
    ]);
    const movieInfo = reactive({
      name: "",
      desc: ""
    });
    const store = useStore();
    return {
      store,
			message,
			movieInfo,
      stateDone,
			permitSend,
      formAddMovie,
      stateSending,
    };
  },
  methods: {
    async sendMovie() {
			['name', 'desc'].forEach((item) => {
				if(!this.checkInput(item)) {
					this.permitSend = false;
					return false;
				}
			});
			if(!this.permitSend) {
				this.stateSending = true;
				const res = await this.store.dispatch("createMovie", {
					data: this.movieInfo,
				});
				if(res.message === 'SUCCESSFUL!') {
					this.aleart();
				}
			}
    },
    aleart() {
			this.stateDone = true;
			this.stateSending = false;
      setTimeout(() => {
        this.stateDone = false;
      }, 4000);
    },
		checkInput(field) {
			if(field === 'name') {
				if(this.movieInfo.name === "") {
					this.message.name = "bạn chưa nhập tên anime";
					this.permitSend = false;
				}else {
					this.message.name = undefined;
				}
			}else if(field === 'desc') {
				if(this.movieInfo.desc === "") {
					this.message.desc = "bạn chưa nhập tên mô tả anime";
					this.permitSend = false;
				}else {
					this.message.desc = undefined;
				}
			}else {
				this.permitSend = true;
			}
			return this.permitSend;
		}
  }
};
</script>

<style lang="scss" scoped>
.add-movie {
  width: inherit;
  padding: 0.4rem;
  box-sizing: border-box;
  form {
    margin-top: 1rem;
    .validate-field {
      font-size: 1rem;
      margin-bottom: 0.4rem;
      display: block;
      font-style: italic;
      color: red;
    }
    .form-input {
      width: inherit;
      label {
        display: block;
        font-size: 1.2rem;
        color: $base-color;
        font-weight: 600;
        font-style: italic;
      }
      input,
      textarea {
        box-shadow: 0 0 10px $main-color;
      }
      input {
        box-sizing: border-box;
        display: block;
        width: 100%;
        outline: none;
        font-size: 1.1rem;
        margin: 0.4rem 0;
        padding: 0.5rem 0.8rem;
        font-style: italic;
        border: 2px solid $main-color;
        border-radius: 20px;
        color: $base-color;
        font-weight: 600;
        transition: all 0.2s ease-in-out;
        background-color: $light;
        &:focus {
          border-color: $base-color;
          box-shadow: 0 0 10px $base-color;
        }
      }
      textarea {
        width: 100%;
        resize: vertical;
        box-sizing: border-box;
        outline: none;
        font-size: 1.2rem;
        margin: 0.4rem 0;
        padding: 0.5rem 0.8rem;
        font-style: italic;
        border: 2px solid $main-color;
        border-radius: 20px;
        color: $base-color;
        font-weight: 600;
        min-height: 12rem;
        transition: all 0.2s ease-in-out;
        background-color: $light;
        &:focus {
          border-color: $base-color;
          box-shadow: 0 0 10px $base-color;
        }
      }
    }
    button {
      display: block;
      font-size: 1.2rem;
      padding: 0.5rem 0.8rem;
      background-color: #fff;
      border: 2px solid $base-color;
      border-radius: 20px;
      transition: all 0.1s ease-in-out;
      cursor: pointer;
      box-shadow: 0 0 10px $main-color;
      color: #fff;
      background-color: $main-color;
      border-color: $main-color;
      &:hover {
        color: $base-color;
        box-shadow: 0 0 10px $base-color;
        background-color: transparent;
        border-color: $base-color;
      }
    }
    .status-send {
      display: block;
      font-size: 1.2rem;
      color: $base-color;
      margin: 1rem 0;
    }
    .status-done {
      display: block;
      font-size: 1.2rem;
      color: $base-color;
      margin: 1rem 0;
    }
  }
}
</style>
