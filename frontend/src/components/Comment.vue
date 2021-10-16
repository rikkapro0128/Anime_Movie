<template>
  <div class="comment">
    <div class="comment__vertical"></div>
    <div class="comment__top">
      <div class="comment__top--if-left">
        <img
          :src="
            comment.img
              ? comment.img
              : 'https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg'
          "
          alt="avatar"
        />
      </div>
      <div class="comment__top--if-right">
        <span class="comment__top--if-right-name">{{ comment.name }}</span>
        <span class="comment__top--if-right-contents">{{
          comment.content
        }}</span>
      </div>
    </div>
    <div class="comment__tool">
      <span @click="actionLikeComment(comment._id)">({{ totalLike }}) Thích</span>
      <span @click="showCompilation = !showCompilation">Trả lời</span>
      <span>Báo cáo</span>
    </div>
    <div class="comment--write-message" v-show="showCompilation">
      <div
        v-if="(replys?.length || comment?.replys?.length) && showReplys"
        class="comment--write-message__vertical"
      ></div>
      <input
        type="text"
        v-model="contentReply"
        placeholder="Trả lời bạn này...!"
      />
      <button
        class="btn box__sd--pink"
        @click="
          hanldeReply({
            comment_id: comment._id,
            contentReply: contentReply
          })
        "
      >
        Trả lời
      </button>
    </div>
    <span
      v-if="replys?.length || comment?.replys?.length"
      @click="(showReplys = !showReplys), showReplys ? getReplys() : null"
      class="comment__count"
      :class="{ vertical: showReplys }"
      >>> {{ showReplys ? "Ẩn" : "Hiển thị" }}
      {{ replys?.length || comment?.replys?.length }} trả lời</span
    >
    <span class="comment__loading" v-if="loading">Đang tải comment...!</span>
    <div class="comment__reply" v-if="!loading && showReplys">
      <Comment v-for="(reply, index) in replys" :key="index" :comment="reply" />
    </div>
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
import Comment from "./Comment.vue";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    comment: {
      type: Object
    }
  },
  components: { Comment, Popup },
  setup(props) {
    const message = ref("");
    const notify = ref(false);
    const host = ref(process.env.VUE_APP_HOST_SERVER);
    const showCompilation = ref(false);
    const showReplys = ref(false);
    const loading = ref(false);
    const store = useStore();
    const replys = ref([]);
    const contentReply = ref("");
    const dontCallHome = ref(true);
    const totalLike = ref(null);
    (async () => {
      totalLike.value = await store.dispatch("getLikesByComment", {
        id_comment: props.comment._id
      });
    })();
    return {
      host,
      store,
      notify,
      replys,
      message,
      loading,
      totalLike,
      showReplys,
      dontCallHome,
      contentReply,
      showCompilation
    };
  },
  methods: {
    async hanldeReply({ comment_id, contentReply }) {
      const isLogin = JSON.parse(localStorage.getItem("isLogin"));
      if (!isLogin) {
        // Notification user must login before coment!
        this.message = "Oni-chan phải đăng nhập cái đã!";
        this.notify = true;
        return;
      }
      if (!contentReply) {
        // Notification no comment insert!
        this.message = "Oni-chan đã phát ngôn gì đâu?";
        this.notify = true;
        return;
      }
      if (contentReply) {
        await this.store.dispatch("createReply", {
          id_comment: comment_id,
          content_reply: contentReply
        });
        this.showReplys = true;
        await this.getReplys();
        this.contentReply = "";
        this.showCompilation = false;
      }
    },
    async getReplys() {
      this.loading = true;
      await this.store.dispatch("getReplysByComment", {
        id_comment: this.comment._id
      });
      this.replys = this.store.state.comments;
      this.loading = false;
    },
    async actionLikeComment(id_comment) {
      await this.store.dispatch("likeComment", {
        id_comment
      });
      this.totalLike = await this.store.dispatch("getLikesByComment", {
        id_comment: this.comment._id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  padding: 0.8rem 0;
  &__top {
    display: flex;
    &--if-left {
      width: 4.375rem;
      height: 4.375rem;
      margin-right: 0.5rem;
      img {
        border: 1px solid $main-color;
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
    &--if-right {
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
        font-style: italic;
      }
    }
  }
  &__tool {
    position: relative;
    left: 4.375rem;
    span {
      cursor: pointer;
      margin: 0 0.5rem;
      color: $base-color;
      &:hover {
        color: $main-color;
      }
    }
  }
  &--write-message {
    position: relative;
    left: 4.375rem;
    margin-top: 0.4rem;
    width: calc(100% - 4.375rem);
    display: flex;
    align-items: center;
    input {
      height: fit-content;
      box-sizing: border-box;
      width: 100%;
      border-radius: 10px;
      border: 2px solid $main-color;
      outline: none;
      padding: 0.4rem 0.5rem;
      font-size: 1.2rem;
    }
    button {
      margin-left: 0.5rem;
    }
    &::before {
      height: 100%;
      width: 20px;
      content: "";
      display: block;
      position: absolute;
      top: calc(-50% + 2px);
      left: -2.5rem;
      background-color: #0000;
      border: 2px solid $main-color;
      border-right-color: #0000;
      border-top-color: #0000;
      box-sizing: border-box;
      border-bottom-left-radius: 16px;
    }
    &::after {
      height: 2px;
      width: 18px;
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: -1.6rem;
      background-color: $main-color;
    }
    &__vertical {
      width: 2px;
      height: 180%;
      content: "";
      display: block;
      position: absolute;
      top: -14px;
      left: -2.5rem;
      background-color: #ffa9be;
    }
  }
  &__count {
    display: block;
    width: calc(100% - 4.375rem - 2 * 0.5rem);
    position: relative;
    left: 4.375rem;
    cursor: pointer;
    padding: 0.5rem;
    &.vertical::before {
      width: 2px;
      height: 180%;
      content: "";
      display: block;
      position: absolute;
      top: -14px;
      left: -2.5rem;
      background-color: $main-color;
    }
    &:hover {
      color: $main-color;
    }
  }
  &__reply {
    display: block;
    width: calc(100% - 4.375rem);
    position: relative;
    left: 4.375rem;
    .comment {
      position: relative;
      &:not(:last-child) > .comment__vertical {
        position: absolute;
        height: 100%;
        width: 2px;
        content: "";
        display: block;
        top: 15px;
        left: -2.5rem;
        background-color: $main-color;
      }
      &::before {
        height: 37px;
        width: 20px;
        content: "";
        display: block;
        position: absolute;
        top: calc(0px + 0.8rem);
        left: -2.5rem;
        background-color: #0000;
        border: 2px solid $main-color;
        border-right-color: #0000;
        border-top-color: #0000;
        box-sizing: border-box;
        border-bottom-left-radius: 16px;
      }
      &::after {
        height: 2px;
        width: 18px;
        content: "";
        display: block;
        position: absolute;
        top: calc(35px + 0.8rem);
        left: -1.6rem;
        background-color: $main-color;
      }
    }
  }
  &__loading {
    display: block;
    width: calc(100% - 4.375rem);
    position: relative;
    left: 4.375rem;
  }
}
.horizontal {
  display: block;
  height: 7px;
  background-repeat: repeat-x;
}
</style>
