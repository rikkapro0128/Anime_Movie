import { createStore } from 'vuex';
import VueCookies from 'vue-cookies'
import jwt_decode from "jwt-decode";
import fetchApi from '../utils/fetchApi.js';

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
            const data = await fetchApi.GET(`admin/path-dir-upload`);
            return data.path ? data.path : '';
        },
        async getMovies({ commit }) {
            const data = await fetchApi.GET(`take-mv/ls`);
            if(data) {
                commit('setMovies', data);
            }
        },
        async getMovieByLabel({ commit }, { label, options }) {
            options.esp = options.esp ? 'esp=' + options.esp : '';
            const data = await fetchApi.GET(`take-mv/${label}/options?${options.esp}`);
            if(data) {
                commit('setMovie', data);
                return true;
            }
            return false;
        },
        async removeVideoByLabel(_, { label, options }) {
            options.esp = options.esp ? 'esp=' + options.esp : '';
            options.id_esp = options.id_esp ? '&id_esp=' + options.id_esp : '';
            const data = await fetchApi.DELETE(`admin/remove-video/${label}/options?${options.esp}${options.id_esp}`);
            if(data.message === 'SUCCESSFUL!') { return true; }
            return false;
        },
        async removeMovieByLabel(_, { label, options }) {
            options.select = options.select ? 'select=' + options.select : '';
            const data = await fetchApi.DELETE(`admin/remove-movie/${label}/options?${options.esp}`);
            if(data.message === 'SUCCESSFUL!') { return true; }
            return false;
        },
        async sendImage(_, { fieldImage, url, file, }) {
            const formData = new FormData();
            formData.append(fieldImage, file);
            const data = await fetchApi.POST(url, formData, 'image');
            if(data.message === 'SUCCESSFUL!') { return true; }
            return false;
        },
        async sendNameVideo(_, { url, pathVideo }) {
            const data = await fetchApi.POST(url, { pathVideo });
            if(data.message === 'SUCCESSFUL!') { return true; }
            return false;
        },
        async updateMovie(_, { label, options }) {
            const data = await fetchApi.POST(`admin/update-movie/${label}/options`, { data: { value: options.data, type: options.type } })
            if(data.message === 'SUCCESSFUL!') { return true; }
            return false;
        },
        async sendDataSign(_, { dataForm }) {
            let data;
            if(dataForm.type === 'sign-up') {
                data = await fetchApi.POST('st-sign/act-up' , dataForm);
            }
            else if(dataForm.type === 'sign-in') {
                data = await fetchApi.POST('st-sign/act-in' , dataForm);
            }else if(dataForm.type === 'sign-out') {
                data = await fetchApi.POST('st-sign/act-out' , dataForm);
            }
            if(data.message === 'SUCCESSFUL!') {
                if(dataForm.type !== 'sign-out') {
                    const decode_token = jwt_decode(data.token);
                    const decode_refToken = jwt_decode(data.refToken);
                    // console.log(exp_token, exp_refToken)
                    VueCookies.set('token', data.token, new Date(decode_token.exp * 1000));
                    VueCookies.set('ref_token', data.refToken, new Date(decode_refToken.exp * 1000));
                    // (time * 1000 - new Date().getTime()) / 1000) to remain second expire token
                    return { type: decode_refToken.type, name: decode_refToken.name, _id: decode_refToken._id };
                } else {
                    return true;
                }
            }
            return false;
        },
        async createMovie(_, { data }) {
            return await fetchApi.POST('admin/create-movie', data);
        }
    },
    getters: {
        
    }
});

export { movie };
