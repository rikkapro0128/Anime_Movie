import { createStore } from 'vuex';

const movie = createStore({
    state() {
        return {
            movies: [],
            movie: {},
            dataForm: {
                
            }
        };
    },
    mutations: {
        setMovies(state, data) {
            state.movies = data;
        },
        setMovie(state, data) {
            state.movie = data;
        }
    },
    actions: {
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
            }
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
        }
    },
    getters: {
        
    }
});

export { movie };
