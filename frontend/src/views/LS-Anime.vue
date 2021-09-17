<template>
    <div class="ls-ani">
        <h1 class="tl-ani">Danh Sách Anime</h1>
        <table>
            <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Tập hiện tại</th>
                <th>Xoá</th>
            </tr>
            <tr v-for="(data, index) in dataCard" :key="index">
                <td class="stt">{{ index }}</td>
                <td class="name">{{ data.name }}</td>
                <td class="eps">{{ data.videos[(data.videos.length - 1)] ? data.videos[(data.videos.length - 1)].esp : 0 }}</td>
                <router-link :to="`/admin/danh-sach-anime/${data.label}`"></router-link>
                <td @click="removeMovie(data.label)" class="remove hov-remove"><i class="far fa-trash-alt"></i></td>
            </tr>
        </table>
        <h1 class="loading" v-if="!dataCard.length">Đang tải danh sách...!</h1>
    </div>
</template>

<script>
import { ref, watch  } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const dataCard = ref([]);
        const store = useStore();
        const changeDataCard = ref(false);
        watch(
            () => changeDataCard.value,
            () => {
                getDataCard();
            }
        )
        getDataCard();
        async function getDataCard() {
            await store.dispatch('getMovies');
            dataCard.value = store.state.movies;
        }
        return { 
            store,
            dataCard,
            changeDataCard,
        }
    },
    methods: {
        async removeMovie(label) {
            await this.store.dispatch('removeMovieByLabel', { label, options: { select: '' } });
            this.changeDataCard = !this.changeDataCard;
        },
    }
}
</script>

<style lang="scss" scoped>
    .ls-ani {
        width: 100%;
        padding: 0.4rem;
        box-sizing: border-box;
    }
</style>
