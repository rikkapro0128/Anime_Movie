<template>
  <div class="sign">
    <div class="sign__form">
      <h3>Đăng Ký Đi!</h3>
      <span
        >Chào mừng bạn, hãy nhập đầy đủ thông tin bên dưới để đăng ký tài khoản
        bạn nhé - sau khi đăng ký sẽ có nhiều thứ để trải nghiệm lắm đó (^^)
        nyan~!
      </span>
      <Input
        v-for="(input, index) in setInput"
        :key="index"
        :ref="input.inputName"
        :data="input"
        @onChangeValueInput="changeValue"
      />
      <button @click="submitSignUp()" class="log">
        <i class="fas fa-check-circle"></i>
        Đăng Ký
      </button>
      <h4>Ngoài Ra</h4>
      <h1>|= Bạn cũng có thể đăng nhập bằng =|</h1>
      <button class="google">
        <i class="fab fa-google"></i>
        Google
      </button>
      <button class="facebook">
        <i class="fab fa-facebook"></i>
        Faceook
      </button>
    </div>
    <Overlay
      :toggle="loading || showPopup"
      :color_ol="'#00000059'"
      @changeToggle="showPopup = !showPopup"
    />
    <Loading :toggle="loading" />
    <Popup
      :toggle="showPopup"
      :message="message"
      @changeToggle="showPopup = !showPopup"
    />
  </div>
</template>

<script>
import Input from "../components/Input.vue";
import Popup from "../components/Popup.vue";
import Loading from "../components/Loading.vue";
import Overlay from "../components/Overlay.vue";
import helper from "../utils/helperLocalStorage.js";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
export default {
  components: { Input, Popup, Loading, Overlay },
  setup() {
    const setInput = reactive([
      {
        labelName: "Bạn muốn xưng hô thế nào nè?",
        inputName: "name",
        type: "text",
        mess: "",
        rule: "Tên phải lớn hơn 8 và nhỏ hơn 24 ký tự!",
        permit: false,
      },
      {
        labelName: "Email của bạn là gì?",
        inputName: "email",
        type: "text",
        mess: "",
        rule: "Email không hợp lệ!",
        permit: false,
      },
      {
        labelName: "Nhập mật khẩu vào bên dưới nhé?",
        inputName: "password",
        type: "password",
        mess: "",
        rule: "Mật khẩu phải lớn hơn 8 và nhỏ hơn 24 ký tự!",
        permit: false,
      },
      {
        labelName: "Nhập lại mật khẩu nè!",
        inputName: "re_password",
        type: "password",
        mess: "",
        rule: "Mật khẩu không khớp!",
        permit: false,
      },
    ]);
    const dataForm = reactive({
      name: "",
      email: "",
      password: "",
      re_password: "",
      type: "sign-up",
    });
    const store = useStore();
    const loading = ref(false);
    const checkErrorForm = ref(false);
    const showPopup = ref(false);
    const message = ref("");
    return {
      store,
      loading,
      message,
      setInput,
      dataForm,
      showPopup,
      checkErrorForm,
    };
  },
  methods: {
    changeValue(inputValue) {
      this.dataForm[inputValue.field] = inputValue.value;
      let contentField = "";
      if (inputValue.field === "name") {
        contentField = "Tên gọi của bạn";
      } else if (inputValue.field === "email") {
        contentField = "Email";
      } else if (inputValue.field === "password") {
        contentField = "Mật khẩu";
      } else if (inputValue.field === "re_password") {
        contentField = "Mật khẩu xác nhận";
      }
      if (!inputValue.value) {
        this.$refs[
          inputValue.field
        ].data.mess = `Bạn chưa nhập ${contentField} nè!`;
        this.textError(inputValue);
      } else {
        this.changeContentField(inputValue, contentField);
      }
    },
    changeContentField(inputValue, contentField) {
      const lengthValue = inputValue.value.length;
      if (
        inputValue.field === "name" &&
        (lengthValue < 8 || lengthValue > 24)
      ) {
        this.$refs[inputValue.field].data.mess = this.setInput[0].rule;
        this.textError(inputValue);
        this.setInput[0].permit = false;
      } else if (
        inputValue.field === "email" &&
        !this.checkEmail(inputValue.value)
      ) {
        this.$refs[inputValue.field].data.mess = this.setInput[1].rule;
        this.textError(inputValue);
        this.setInput[1].permit = false;
      } else if (
        inputValue.field === "password" &&
        (lengthValue < 8 || lengthValue > 24)
      ) {
        this.$refs[inputValue.field].data.mess = this.setInput[2].rule;
        this.textError(inputValue);
        this.setInput[2].permit = false;
      } else if (
        inputValue.field === "re_password" &&
        !this.comparePassword(inputValue.value, this.dataForm.password)
      ) {
        this.$refs[inputValue.field].data.mess = this.setInput[3].rule;
        this.textError(inputValue);
        this.setInput[3].permit = false;
      } else if (
        !this.checkSpecials(inputValue.value) &&
        inputValue.field !== "email" &&
        inputValue.field !== "password" &&
        inputValue.field !== "re_password"
      ) {
        this.$refs[
          inputValue.field
        ].data.mess = `${contentField} không được chứa ký tự đặc biệt!`;
        this.textError(inputValue);
        this.setInput[0].permit = false;
      } else {
        this.changeContentFieldSuccess(inputValue, contentField);
      }
    },
    textError(inputValue) {
      this.$refs[inputValue.field].$el.querySelector("span").className =
        "t-error";
    },
    textSuccess(inputValue) {
      this.$refs[inputValue.field].$el.querySelector("span").className =
        "t-success";
    },
    checkEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    comparePassword(password, re_password) {
      return password === re_password;
    },
    checkSpecials(stringTest) {
      return !/[^A-Za-z0-9 ]/g.test(stringTest);
    },
    changeContentFieldSuccess(inputValue, contentField) {
      this.$refs[
        inputValue.field
      ].data.mess = `${contentField} được chấp nhận!`;
      this.textSuccess(inputValue);
      if (inputValue.field === "name") {
        this.setInput[0].permit = true;
      } else if (inputValue.field === "email") {
        this.setInput[1].permit = true;
      } else if (inputValue.field === "password") {
        this.setInput[2].permit = true;
      } else if (inputValue.field === "re_password") {
        this.setInput[3].permit = true;
      }
    },
    async submitSignUp() {
      this.setInput.forEach(({ permit }) => {
        if (!permit) {
          this.checkErrorForm = true;
          return;
        } else {
          this.checkErrorForm = false;
        }
        // if permit all array is true will pass!
      });
      if (!this.checkErrorForm) {
        // dispatch fetch API sing-up
        this.loading = true;
        const value = await this.store.dispatch("sendDataSign", {
          dataForm: this.dataForm,
        });
        if (Object.keys(value).length) {
          this.loading = false;
          this.message = "Bạn đã đăng ký thành công!";
          this.showPopup = true; // redirect to home page
          helper.signLocalStorage(value);
        }
      } else {
        // show popup error
        this.message = "Thông tin vẫn chưa hợp lệ mà!";
        this.showPopup = true;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (isLogin) {
      next({ name: "404-not-found" });
    } else {
      next();
    }
  },
};
</script>

<style scoped lang="scss">
@include sign;
</style>
