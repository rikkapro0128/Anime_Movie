<template>
    <div class="admin">
        <h1 class="tl-ani">Quản lí</h1>
        <div class="admin__sidebar">
            <div class="admin__sidebar--left">
                <div class="box__sd--pink" v-for="(option, index) in optionSideBar" :key="index">
                    <router-link :to="`/admin/${option.path}`">{{ option.name }}</router-link>
                </div>
            </div>
            <div class="admin__sidebar--right">
                <router-view name="ListAnime"></router-view>
                <router-view name="ReportAnime"></router-view>
                <router-view name="AddAnime"></router-view>
                <router-view name="DetailAnime"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import { onMounted, ref } from 'vue';
    export default {
    setup() {
        const routedemo = ref(null);
        const optionSideBar = ref([
            { name: 'Danh sách anime', path: 'danh-sach-anime' },
            { name: 'Phản hồi', path: 'phan-hoi' },
            { name: 'Thêm Phim', path: 'them-anime' },
        ]);
        onMounted(() => {
            console.log()
        })
        return {
            routedemo,
            optionSideBar,
        };
    },
}
</script>

<style lang="scss" scoped>
    .admin {
        margin: 1rem 0;
        @include tl-ani;
        overflow: hidden;
        width: inherit;
        &__sidebar {
            display: flex;
            margin-top: 0.2rem;
            width: 100%;
            background-color: transparent;
            &--left {
                div {
                    margin: 0.4rem;
                    border: 2px solid $main-color;
                    border-radius: 20px;
                    background-color: #fff;
                    transition: all 0.1s ease-in-out;
                    a {
                        transition: color 0.1s ease-in-out;
                        display: block;
                        color: $main-color;
                        text-decoration: none;
                        padding : 0.6rem 0.8rem;
                        white-space: nowrap;
                    }
                    &:hover {
                        background-color: $main-color;
                        border-color: $main-color;
                        a {
                            color: #fff;
                        }
                    }
                }
            }
            &--right {
                margin-left: 1rem;
                width: inherit;
            }
        }
    }
</style>
