<template>
  <section class="sign">
    <div class="sign__form">
      <h3>Đăng Nhập Nào!</h3>
      <span
        >Chào mừng bạn, hãy nhập đầy đủ thông tin bên dưới để đăng nhập vào hệ
        thống bạn nhé - sau khi đăng nhập thành công sẽ có nhiều thứ để trải
        nghiệm lắm đó (^^) nyan~!
      </span>
      <Input
        v-for="(input, index) in setInput"
        :key="index"
        :data="input"
        @onChangeValueInput="changeValue"
      />
      <button class="log" @click="submitSignUp()">
        <i class="fas fa-sign-in-alt"></i>
        Đăng Nhập
      </button>
      <h4>Ngoài Ra</h4>
      <h1>|= Bạn cũng có thể đăng nhập bằng =|</h1>
      <button @click="loginFaceBook()" class="facebook">
        <i class="fab fa-facebook"></i>
        Facebook
      </button>
      <h2>
        Hoặc đăng ký tài khoản <router-link to="/dang-ky">tại đây</router-link>
      </h2>
      <!-- <button class="google">
        <i class="fab fa-google"></i>
        Google
      </button> -->
    </div>
    <Overlay
      :toggle="loading || statePopup"
      :color_ol="'#00000059'"
      @changeToggle="statePopup = !statePopup"
    />
    <Loading :toggle="loading" />
    <Popup
      :toggle="statePopup"
      :message="messagePopup"
      @changeToggle="statePopup = !statePopup"
    />
  </section>
</template>

<script>
import Input from "../components/Input.vue";
import Popup from "../components/Popup.vue";
import Overlay from "../components/Overlay.vue";
import Loading from "../components/Loading.vue";
import helper from "../utils/helperLocalStorage.js";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import { initFbsdk } from "../utils/loginFacebook.js";
// import router from "@/routes/router";
export default {
  components: { Input, Overlay, Loading, Popup },
  setup() {
    const setInput = reactive([
      {
        labelName: "Email của bạn là gì?",
        inputName: "email",
        type: "text"
      },
      {
        labelName: "Nhập mật khẩu vào bên dưới nhé?",
        inputName: "password",
        type: "password"
      }
    ]);
    const dataForm = reactive({
      email: "",
      password: "",
      type: "sign-in"
    });
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);
    const statePopup = ref(false);
    const messagePopup = ref("");
    return {
      store,
      router,
      loading,
      setInput,
      dataForm,
      statePopup,
      messagePopup
    };
  },
  methods: {
    loginFaceBook() {
			const context = this;
			window.FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					// The user is logged in and has authenticated your
					// app, and response.authResponse supplies
					// the user's ID, a valid access token, a signed
					// request, and the time the access token
					// and signed request each expire.
					// var uid = response.authResponse.userID;
					// var accessToken = response.authResponse.accessToken;
				} else if (response.status === 'not_authorized' || response.status === 'unknown') {
					// The user hasn't authorized your application.  They
					// must click the Login button, or you must call FB.login
					// in response to a user gesture, to launch a login dialog.
					window.FB.login(async function(data) {
						// handle the response
						const accessToken = data.authResponse.accessToken;
						const payload = await context.store.dispatch('getAuthFacebook', { accessToken });
						helper.signLocalStorage(payload);
						context.router.push('/');
					}, { scope: 'email, user_likes' });
				}
			});
    },
    changeValue(inputValue) {
      this.dataForm[inputValue.field] = inputValue.value;
    },
    async submitSignUp() {
      // dispatch fetch API sing-up
      // console.log(this.dataForm)
      if (this.dataForm.email && this.dataForm.password) {
        this.loading = true;
        const value = await this.store.dispatch("sendDataSign", {
          dataForm: this.dataForm
        });
        if (Object.keys(value).length) {
          this.loading = false;
          this.messagePopup = "Bạn đã đăng nhập thành công!";
          this.statePopup = true;
          helper.signLocalStorage(value);
        } else {
          this.loading = false;
        }
      } else {
        this.messagePopup =
          "Bạn không thể đăng nhập khi chưa nhập thông tin tài khoản!";
        this.statePopup = true;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (isLogin) {
      next({ name: "404-not-found" });
    } else {
      next();
    }
  }
};
</script>

<style scoped lang="scss">
@include sign;
</style>
