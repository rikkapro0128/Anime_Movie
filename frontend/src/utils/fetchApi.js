import helper from "./helperToken.js";
import VueCookies from "vue-cookies";

class fetchWorker {
  constructor() {
    this.hostName = process.env.VUE_APP_HOST_SERVER;
    this.errFetch = "CANT'T FETCH API!";
  }
  async GET(url) {
    const state = await helper.checkTokenIsExpire();
    if (state === "NEXT!") {
      const res = await fetch(`${this.hostName}/${url}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Cache-Control": "no-cache",
          Authorization: VueCookies.get("token"),
        },
        mode: "cors",
      });
      return await res.json();
    } else {
      return this.errFetch;
    }
  }
  async POST(url, value, type = "json") {
    const state = await helper.checkTokenIsExpire();
    const options = {
      "Content-Type": "application/json",
      Authorization: VueCookies.get("token"),
    };
    if (type === "image") {
      delete options["Content-Type"];
    }
    if (state === "NEXT!") {
      const res = await fetch(`${this.hostName}/${url}`, {
        method: "POST",
        headers: options,
        mode: "cors",
        body: type === "image" ? value : JSON.stringify(value),
      });
      return await res.json();
    } else {
      return this.errFetch;
    }
  }
  async PATCH(url, value) {
    const state = await helper.checkTokenIsExpire();
    if (state === "NEXT!") {
      const res = await fetch(`${this.hostName}/${url}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: VueCookies.get("token"),
        },
        mode: "cors",
        body: JSON.stringify(value),
      });
      return await res.json();
    } else {
      return this.errFetch;
    }
  }
  async DELETE(url) {
    const state = await helper.checkTokenIsExpire();
    if (state === "NEXT!") {
      const res = await fetch(`${this.hostName}/${url}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: VueCookies.get("token"),
        },
        mode: "cors",
      });
      return await res.json();
    } else {
      return this.errFetch;
    }
  }
}

export default new fetchWorker();
