<template>
  <div class="comments">
    <div class="comments__avatar">
      <img
        src="https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg"
        alt="avatar"
      />
    </div>
    <div class="comments__contents">
      <textarea
        name="contents"
        id=""
        ref="elementComment"
        placeholder="Bạn có thể bình luận tại đây...!"
      ></textarea>
    </div>
  </div>
  <button
    class="submit--comments btn box__sd--pink"
    @click="commentThisAnime()"
  >
    Bình luận!
  </button>
  <div class="show--comments">
    <!-- loop many cooment in here -->
    <div class="comment" v-for="(comment, index) in comments" :key="index">
      <div class="comment__if--left">
        <img
          :src="
            comment.img
              ? comment.img
              : 'https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg'
          "
          alt="avatar"
        />
      </div>
      <div class="comment__if--right">
        <span class="comment__if--right-name">{{ comment.name }}</span>
        <span class="comment__if--right-contents">{{ comment.content }}</span>
      </div>
    </div>
    <!-- loop many cooment in here -->
  </div>
  <Popup
    :message="message"
    :dontCallHome="dontCallHome"
    :toggle="notify"
    @changeToggle="notify = !notify"
  />
</template>

<script>
import Popup from "./Popup.vue";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  components: { Popup },
  props: {
    comments: {
      type: Array,
    },
    label: {
      type: String,
    },
  },
  setup() {
    const message = ref("");
    const notify = ref(false);
    const dontCallHome = ref(true);
    const store = useStore();
    return {
      store,
      notify,
      message,
      dontCallHome,
    };
  },
  methods: {
    async commentThisAnime() {
      const comment = this.$refs.elementComment.value;
      const isLogin = JSON.parse(localStorage.getItem("isLogin"));
      if (!isLogin) {
        // Notification user must login before coment!
        this.message = "Oni-chan phải đăng nhập cái đã!";
        this.notify = true;
        return;
      }
      if (!comment) {
        // Notification no comment insert!
        this.message = "Oni-chan đã phát ngôn gì đâu?";
        this.notify = true;
        return;
      }
      await this.store.dispatch("activeComment", {
        data: { comment, label_ani: this.label },
      });
      await this.store.dispatch("getCommentByLabel", { label_ani: this.label });
      this.$refs.elementComment.value = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.comments {
  width: 100%;
  display: flex;
  &__avatar {
    max-width: 4.375rem;
    height: 4.375rem;
    font-size: 4.375rem;
    margin: 0 auto;
    color: $main-color;
    border: 2px solid $main-color;
    border-radius: 12px;
    box-shadow: 0 0 10px $main-color;
    img {
      width: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  &__contents {
    width: 100%;
    margin-left: 0.6rem;
    textarea {
      width: 100%;
      min-height: 4.375rem;
      max-height: 12rem;
      resize: vertical;
      box-sizing: border-box;
      border: 2px solid $main-color;
      border-radius: 10px;
      outline: none;
      box-shadow: 0 0 10px $main-color;
      padding: 0.5rem;
      font-size: 1.2rem;
      font-family: "Patrick Hand", cursive;
      color: $base-color;
    }
  }
}
button {
  display: block;
  float: right;
  margin: 0.5rem 0;
}
.show--comments {
  clear: both;
  .comment {
    display: flex;
    margin: 0.5rem 0;
    &__if--left {
      width: 4.375rem;
      height: 4.375rem;
      img {
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
    &__if--right {
      width: 100%;
      margin-left: 0.4rem;
      span {
        display: block;
      }
      &-name {
        color: $main-color;
      }
      &-contents {
        color: $base-color;
      }
    }
  }
}
</style>
