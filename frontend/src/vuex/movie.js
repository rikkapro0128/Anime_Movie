import { createStore } from "vuex";
import VueCookies from "vue-cookies";
import jwt_decode from "jwt-decode";
import fetchApi from "../utils/fetchApi.js";

const movie = createStore({
	state() {
		return {
			movies: [],
			pagination: {
				page: 0,
				range: 30,
				lengthMovies: 0
			},
			movie: {},
			comments: []
		};
	},
	mutations: {
		setMovies(state, data) {
			state.movies = data;
		},
		setMovie(state, data) {
			state.movie = data;
		},
		setComments(state, data) {
			state.comments = data;
		},
		setLengthMovies(state, data) {
			state.pagination.lengthMovies = data;
		}
	},
	actions: {
		async getPathDirStorage() {
			const data = await fetchApi.GET(`admin/path-dir-upload`);
			return data.path ? data.path : "";
		},
		async getAuthFacebook(_, { accessToken }) {
			const data = await fetchApi.GET(`st-sign/auth/facebook?access_token=${accessToken}`);
			// return data.message === 'SUCCESSFUL!' ? data.state : null;
      if (data.message === "SUCCESSFUL!") {
        const decode_token = jwt_decode(data.token);
        const decode_refToken = jwt_decode(data.refToken);
        // console.log(exp_token, exp_refToken)
        VueCookies.set(
          "token",
          data.token,
          new Date(decode_token.exp * 1000)
        );
        VueCookies.set(
          "ref_token",
          data.refToken,
          new Date(decode_refToken.exp * 1000)
        );
        // (time * 1000 - new Date().getTime()) / 1000) to remain second expire token
        return {
          type: decode_refToken.type,
          name: decode_refToken.name,
          _id: decode_refToken._id,
          avatarFacebook: data.avatarFacebook,
        };
			}
			return false;
		},
		async getMovies({ commit }, { page, range }) {
			const data = await fetchApi.GET(
				`common/take-movie/range?page=${page}&range=${range}`
			);
			if (data.message === "SUCCESSFUL!") {
				commit("setMovies", data.movies);
				return true;
			}
			return false;
		},
		async getMovieByLabel({ commit }, { label, options }) {
			options.esp = options.esp ? "esp=" + options.esp : "";
			const data = await fetchApi.GET(
				`common/take-mv/${label}/options?${options.esp}`
			);
			if (data) {
				commit("setMovie", data);
				return true;
			}
			return false;
		},
		async removeVideoByLabel(_, { label, options }) {
			options.esp = options.esp ? "esp=" + options.esp : "";
			options.id_esp = options.id_esp ? "&id_esp=" + options.id_esp : "";
			const data = await fetchApi.DELETE(
				`admin/remove-video/${label}/options?${options.esp}${options.id_esp}`
			);
			if (data.message === "SUCCESSFUL!") {
				return true;
			}
			return false;
		},
		async removeMovieByLabel(_, { label, options }) {
			options.select = options.select ? "select=" + options.select : "";
			const data = await fetchApi.DELETE(
				`admin/remove-movie/${label}/options?${options.esp}`
			);
			if (data.message === "SUCCESSFUL!") {
				return true;
			}
			return false;
		},
		async sendImage(_, { fieldImage, url, file }) {
			const formData = new FormData();
			formData.append(fieldImage, file);
			const data = await fetchApi.POST(url, formData, "image");
			if (data.message === "SUCCESSFUL!") {
				return true;
			}
			return false;
		},
		async sendNameVideo(_, { url, pathVideo }) {
			const data = await fetchApi.POST(url, { pathVideo });
			if (data.message === "SUCCESSFUL!") {
				return true;
			}
			return false;
		},
		async updateMovie(_, { label, options }) {
			const data = await fetchApi.POST(`admin/update-movie/${label}/options`, {
				data: { value: options.data, type: options.type }
			});
			if (data.message === "SUCCESSFUL!") {
				return data.newLabel;
			}
			return null;
		},
		async sendDataSign(_, { dataForm }) {
			let data;
			if (dataForm.type === "sign-up") {
				data = await fetchApi.POST("st-sign/act-up", dataForm);
			} else if (dataForm.type === "sign-in") {
				data = await fetchApi.POST("st-sign/act-in", dataForm);
			} else if (dataForm.type === "sign-out") {
				data = await fetchApi.POST("st-sign/act-out", dataForm);
			}
			if (data.message === "SUCCESSFUL!") {
				if (dataForm.type !== "sign-out") {
					const decode_token = jwt_decode(data.token);
					const decode_refToken = jwt_decode(data.refToken);
					// console.log(exp_token, exp_refToken)
					VueCookies.set(
						"token",
						data.token,
						new Date(decode_token.exp * 1000)
					);
					VueCookies.set(
						"ref_token",
						data.refToken,
						new Date(decode_refToken.exp * 1000)
					);
					// (time * 1000 - new Date().getTime()) / 1000) to remain second expire token
					return {
						type: decode_refToken.type,
						name: decode_refToken.name,
						_id: decode_refToken._id
					};
				} else {
					return true;
				}
			}
			return false;
		},
		async createMovie(_, { data }) {
			return await fetchApi.POST("admin/create-movie", data);
		},
		async createComment(_, { data }) {
			return await fetchApi.POST("user/create-comment", data);
		},
		async createReply(_, { id_comment, content_reply }) {
			return await fetchApi.POST("user/reply-comment", { id_comment, content_reply });
		},
		async likeComment(_, { id_comment }) {
			return await fetchApi.POST(`user/like-comment/${id_comment}`);
		},
		async getCommentByLabel({ commit }, { label_ani }) {
			const data = await fetchApi.GET(`common/take-comment/${label_ani}`);
			if (data.message === "SUCCESSFUL!") {
				commit("setComments", data.comments);
				return true;
			}
			return false;
		},
		async getReplysByComment({ commit }, { id_comment }) {
			const data = await fetchApi.GET(`common/get-replys-comment/${id_comment}`);
			if (data.message === "SUCCESSFUL!") {
				commit("setComments", data.comments);
				return true;
			}
			return false;
		},
		async getLikesByComment(_, { id_comment }) {
			const data = await fetchApi.GET(`common/get-like-comment/${id_comment}`);
			if (data.message === "SUCCESSFUL!") {
				return data.likeTotal;
			}
			return false;
		},
		async getLengthMovies({ commit }) {
			const data = await fetchApi.GET(`common/take-length-movies`);
			if (data.message === "SUCCESSFUL!") {
				commit("setLengthMovies", data.length);
				return true;
			}
			return false;
		},
    async searchAnime(_, { keys }) {
      const data = await fetchApi.GET(`common/search/anime?keys=${keys}`);
			if (data.message === "SUCCESSFUL!") {
				return data.lookMovie;
			}
			return false;
    },
		async saveAnimeInfomation(_, { data }) {
			const res = await fetchApi.POST('admin/update/info-anime', data);
			if (res !== "CANT'T FETCH API!") {
				return true;
			}
			return false;
		}
	},
	getters: {}
});

export { movie };
