<template>
    <div class="movie">
        <div class="movie__details">
            <div class="movie__details--img">
                <img :src="`http://localhost:5000${movie.image}`" alt="">
            </div>
            <div class="movie__details--content">
                <h1 class="">
                    <span>Tên Anime :</span>
                    {{ movie.name }}</h1>
                <h3>
                    <span>Mô tả :</span>
                    {{ movie.desc }}
                    </h3>
            </div>
        </div>
        <div class="tool">
            <div class="ls-btn">
                <router-link class="btn" :to="`/movie/${label}?esp=1`">Xem Anime</router-link>
                <router-link class="btn" to="/">Xem Trailer</router-link>
            </div>
            <div class="esp">
                <h1>Tập =></h1>
                <div class="esp--ls">
                    <router-link v-for="(video, index) in movie.videos" :key="index" class="btn t-green" :to="`/view-movie/${label}?esp=${video.esp}`">{{ video.esp }}</router-link>
                </div>
                <span v-if="Object.keys(movie).includes('videos') ? !movie.videos.length : false">Vẫn chưa cập nhật tập nào!</span>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { ref, } from 'vue';
import { useStore } from 'vuex';
export default {
    props: ['name_movie'],
    setup() {
        const route = useRoute();
        const store = useStore();
        const label = ref(route.params.label_anime);
        const movie = ref({});
        (async () => {
            await store.dispatch('getMovieByLabel', { label: label.value, options: { esp: 'all' } });
            movie.value = store.state.movie;
        })();
        return { 
            label,
            movie,
        }
    },
}
</script>

<style lang="scss" scoped>
    .movie {
        width: inherit;
        margin: 1rem 0;
        @include tl-ani;
        &__details {
            display: flex;
            height: 18rem;
            &--img {
                min-width: 14rem;
                height: 100%;
                img {
                    display: block;
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 10px;
                    border: 2px solid $base-color;
                }
            }
            &--content {
                margin-left: 1rem;
                height: 100%;
                h1 {
                    color: $base-color;
                    font-size: 1.3rem;
                    span {
                        font-size: 1.4rem;
                        color: $tl-color;
                    }
                }
                h3 {
                    color: $base-color;
                    margin: 1rem 0;
                    font-size: 1.2rem;
                    line-height: 1.6rem;
                    max-height: calc(100% - 3.3rem);
                    overflow-y: scroll;
                    span {
                        font-size: 1.2rem;
                        color: $tl-color;
                    }
                }
            }
        }
        .tool {
            display: flex;
            margin: 1rem 0;
            width: 100%;
            .ls-btn {
                display: flex;
                min-width: 14rem;
                a {
                    margin: 0 0.2rem;
                }
            }
            .esp {
                width: 100%;
                display: flex;
                align-items: center;
                margin-left: 1rem;
                &--ls {
                    margin-left: 0.6rem;
                    display: flex;
                    a {
                        margin: 0 0.2rem;
                    }
                }
                h1 {
                    font-size: 1.2rem;
                    color: $tl-color;
                    white-space: nowrap;
                }
                span {
                    width: 100%;
                    display: block;
                    text-align: center;
                    font-size: 1.2rem;
                    color: $tl-color;
                }
            }
        }
    }
</style>
