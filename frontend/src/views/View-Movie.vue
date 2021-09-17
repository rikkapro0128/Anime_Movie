<template>
    <div class="movie-view">
        <h1 class="tl-ani ls-anime">
            <span><i class="fas fa-heart"></i></span>
            Bạn đang xem <span>{{ data.movie.name }}</span> | tập {{ esp }}</h1>
            <!-- poster="//vjs.zencdn.net/v/oceans.png" -->
            <div class="movie-view__video box__sd--pink">
                <Video :link_mv="linkVideo" />
            </div>
        <div class="movie-view__ls-esp box__sd--pink">
            <span>Các Tập :</span>
            <router-link v-for="(video, index) in data.videos" :key="index" class="btn btn--esp" :to="`/view-movie/${label}?esp=${video.esp}`">{{ video.esp }}</router-link>
        </div>
    </div>
</template>

<script>
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import { 
        ref,
        reactive,
        watch,
    } from 'vue';
    import Video from '../components/Video.vue';
    export default {
        components: {
            Video,
        },
        setup() {
            const route = useRoute();
            const store = useStore();
            const label = ref(route.params.label_anime);
            const esp = ref(route.query.esp);
            const data = reactive({ videos: [], movie: {} });
            const linkVideo = ref('');
            function getLink(value) {
                let state = data.videos.find((vd => vd.esp === value));
                if(state) { return state.path.split('\\').join('/'); }
            }
            (async () => {
                await store.dispatch('getMovieByLabel', {
                    label: label.value,
                    options: { esp: 'all', },
                });
                data.movie = store.state.movie;
                data.videos = data.movie.videos;
                linkVideo.value = getLink(esp.value);
            })();
            watch(() => route.query.esp, (newValue) => {
                linkVideo.value = getLink(newValue);
                esp.value = route.query.esp;
            })
            return {
                esp,
                data,
                label,
                linkVideo,
            }
        },
    }
</script>

<style lang="scss" scoped>
    .movie-view {
        width: inherit;
        margin: 2rem 0;
        @include tl-ani;
        #mv-player {
            display: block;
            margin: 0 auto;
            border-radius: 5px;
            overflow: hidden;
        }
        &__ls-esp {
            background-color: $main-color;
            padding: 1rem;
            border-radius: 5px;
            display: flex;
            align-items: center;
            span {
                color: #fff;
                display: block;
            }
        }
        &__video {
            width: 100%;
            margin: 0 auto;
            padding: 1rem 0;
            background-color: $main-color;
            border-radius: 5px;
            margin: 1rem 0;
        }
    }
</style>
