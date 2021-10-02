import VueCookies from "vue-cookies";
import jwt_decode from "jwt-decode";

class helper {
  clearToken() {
    VueCookies.remove("token");
    VueCookies.remove("ref_token");
  }
  resetLogin() {
    this.clearToken();
    localStorage.clear();
  }
  async refreshToken(refToken) {
    return fetch(`${process.env.VUE_APP_HOST_SERVER}/st-sign/ref-token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: refToken,
      },
    });
  }
  async checkTokenIsExpire() {
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (isLogin) {
      const getToken = VueCookies.get("token");
      if (getToken) {
        return "NEXT!";
      } else {
        // go refresh token
        const getRefToken = VueCookies.get("ref_token");
        if (getRefToken) {
          const res = await (await this.refreshToken(getRefToken)).json();
          if (res.token) {
            const decode_token = jwt_decode(res.token);
            VueCookies.set(
              "token",
              res.token,
              new Date(decode_token.exp * 1000)
            );
            return "NEXT!";
          } else {
            return "SESSION EXPIRE!";
          }
        } else {
          return "SESSION EXPIRE!";
        }
      }
    } else {
      return "NEXT!";
    }
  }
}

export default new helper();
