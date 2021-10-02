class helper {
  signLocalStorage(payload) {
    localStorage.setItem("isLogin", "true");
    if (payload.type === "admin") {
      localStorage.setItem("isAdmin", JSON.stringify(true));
      localStorage.removeItem("isUser");
    } else if (payload.type === "user") {
      localStorage.removeItem("isAdmin");
      localStorage.setItem("isUser", JSON.stringify(true));
    }
    if (payload.name && payload._id) {
      localStorage.setItem("nameUser", JSON.stringify(payload.name));
      localStorage.setItem("id_user", JSON.stringify(payload._id));
    }
  }
}

export default new helper();
