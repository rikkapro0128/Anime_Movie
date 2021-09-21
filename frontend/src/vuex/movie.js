import { createStore } from 'vuex';
import VueCookies from 'vue-cookies'
import jwt_decode from "jwt-decode";

const movie = createStore({
    state() {
        return {
            movies: [],
            movie: {},
        };
    },
    mutations: {
        setMovies(state, data) {
            state.movies = data;
        },
        setMovie(state, data) {
            state.movie = data;
        },
    },
    actions: {
        async getPathDirStorage() {
            const data = await fetch(`${process.env.VUE_APP_HOST_SERVER}/admin/path-dir-upload`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Cache-Control': 'no-cache',
                },
                mode: 'cors',
            })
            const res = await data.json();
            if(res.path) {
                return res.path;
            }
            return '';
        },
        async getMovies({ commit }) {
            const data = await fetch(`${process.env.VUE_APP_HOST_SERVER}/take-mv/ls`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Cache-Control': 'no-cache',
                },
                mode: 'cors',
            })
            const res = await data.json();
            if(res) {
                commit('setMovies', res);
            }
        },
        async getMovieByLabel({ commit }, { label, options }) {
            options.esp = options.esp ? 'esp=' + options.esp : '';
            const data = await fetch(`${process.env.VUE_APP_HOST_SERVER}/take-mv/${label}/options?${options.esp}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Cache-Control': 'no-cache',
                },
                mode: 'cors',
            })
            const res = await data.json();
            if(res) {
                commit('setMovie', res);
                return true;
            }
            return false;
        },
        async removeVideoByLabel(_, { label, options }) {
            options.esp = options.esp ? 'esp=' + options.esp : '';
            options.id_esp = options.id_esp ? '&id_esp=' + options.id_esp : '';
            const data = await fetch(`${process.env.VUE_APP_HOST_SERVER}/admin/remove-video/${label}/options?${options.esp}${options.id_esp}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Cache-Control': 'no-cache',
                },
                mode: 'cors',
            })
            const res = await data.json();
            if(res.message === 'success!') { return true; }
            return false;
        },
        async removeMovieByLabel(_, { label, options }) {
            options.select = options.select ? 'select=' + options.select : '';
            const data = await fetch(`${process.env.VUE_APP_HOST_SERVER}/admin/remove-movie/${label}/options?${options.esp}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Cache-Control': 'no-cache',
                },
                mode: 'cors',
            })
            const res = await data.json();
            if(res.message === 'success!') { return true; }
            return false;
        },
        async sendImage(_, { fieldImage, url, file }) {
            const formData = new FormData();
            formData.append(fieldImage, file);
            const data = await fetch(url, {
                method: 'POST',
                body: formData,
            })
            const res = await data.json();
            if(res.message === 'success!') { return true; }
            return false;
        },
        async sendNameVideo(_, { url, pathVideo }) {
            const data = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ pathVideo }),
            })
            const res = await data.json();
            if(res.message === 'success!') { return true; }
            return false;
        },
        async updateMovie(_, { label, options }) {
            const data = await fetch(`${process.env.VUE_APP_HOST_SERVER}/admin/update-movie/${label}/options`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ data: { value: options.data, type: options.type } }),
            })
            const res = await data.json();
            if(res.message === 'success!') { return true; }
            return false;
        },
        async sendDataSign(_, { dataForm }) {
            let data;
            if(dataForm.type === 'sign-up') {
                data = await fetch(`${process.env.VUE_APP_HOST_SERVER}/st-sign/act-up` , {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(dataForm),
                });
            }
            else if(dataForm.type === 'sign-in') {
                data = await fetch(`${process.env.VUE_APP_HOST_SERVER}/st-sign/act-in` , {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(dataForm),
                });
            }else if(dataForm.type === 'sign-out') {
                data = await fetch(`${process.env.VUE_APP_HOST_SERVER}/st-sign/act-out` , {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(dataForm),
                });
            }
            const res = await data.json();
            if(res.message === 'success!') {
                if(dataForm.type !== 'sign-out') {
                    const decode_token = jwt_decode(res.token);
                    const decode_refToken = jwt_decode(res.refToken);
                    // console.log(exp_token, exp_refToken)
                    VueCookies.set('token', res.token, new Date(decode_token.exp * 1000));
                    VueCookies.set('ref_token', res.refToken, new Date(decode_refToken.exp * 1000));
                    // (time * 1000 - new Date().getTime()) / 1000) to remain second expire token
                    return { type: decode_refToken.type, name: decode_refToken.name, _id: decode_refToken._id };
                } else {
                    return true;
                }
            }
            return false;
        },
        async refreshToken(_, { refToken }) {
            const data = await fetch(`${process.env.VUE_APP_HOST_SERVER}/st-sign/ref-token`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': refToken,
                },
            })
            const res = await data.json();
            if(res.message === 'success!') { return res.token; }
            return null;
        },
    },
    getters: {
        
    }
});

export { movie };
