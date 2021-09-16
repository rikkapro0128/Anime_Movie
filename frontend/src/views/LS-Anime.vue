<template>
    <div class="ls-ani">
        <h1 class="tl-ani">Danh Sách Anime</h1>
        <table>
            <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Tập hiện tại</th>
            </tr>
            <tr v-for="(data, index) in dataCard" :key="index">
                <td class="stt">{{ index }}</td>
                <td class="name">{{ data.name }}</td>
                <td class="eps">{{ data.videos[(data.videos.length - 1)].esp }}</td>
                <router-link :to="`/admin/danh-sach-anime/${data.label}`"></router-link>
            </tr>
        </table>
        <h1 class="loading" v-if="!dataCard.length">Đang tải danh sách...!</h1>
    </div>
</template>

<script>
import { ref,  } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const dataCard = ref([]);
        const store = useStore();
        (async () => {
            await store.dispatch('getMovies');
            dataCard.value = store.state.movies;
        })();
        return { 
            store,
            dataCard,
        }
    },
}
</script>

<style lang="scss" scoped>
    .ls-ani {
        width: 100%;
        padding: 0.4rem;
        box-sizing: border-box;
    }
</style>
