<template>
  <div class="comments">
    <div class="comments__avatar">
      <img
        :src="
          avatar ||
            'https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg'
        "
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
  <Comment
    v-for="(comment, index) in comments"
    :key="index"
    :comment="comment"
  />
  <Popup
    :message="message"
    :dontCallHome="dontCallHome"
    :toggle="notify"
    @changeToggle="notify = !notify"
  />
</template>

<script>
import Comment from "./Comment.vue";
import Popup from "./Popup.vue";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  components: { Popup, Comment },
  props: {
    label: {
      type: String
    }
  },
  setup(props) {
    const message = ref("");
    const notify = ref(false);
    const dontCallHome = ref(true);
    const comments = ref([]);
    const store = useStore();
    const avatar = ref(JSON.parse(localStorage.getItem("avatar")));
    (async () => {
      await store.dispatch("getCommentByLabel", { label_ani: props.label });
      comments.value = store.state.comments;
    })();
    return {
      store,
      avatar,
      notify,
      message,
      comments,
      dontCallHome
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
      await this.store.dispatch("createComment", {
        data: { comment, label_ani: this.label }
      });
      await this.store.dispatch("getCommentByLabel", { label_ani: this.label });
      this.comments = this.store.state.comments;
      this.$refs.elementComment.value = "";
    }
  }
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
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      object-fit: cover;
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
</style>
