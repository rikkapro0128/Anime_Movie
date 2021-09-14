<template>
    <header>
        <ul class="nav">
            <li class="nav__item" v-for="item in lsChoose" v-bind:key="item">
                <span class="nav__item--scan"></span>
                <router-link :to="'/' + item.path">
                    {{ item.name }}
                </router-link></li>
        </ul>
        <ul class="nav">
            <li class="nav__item">
                <span class="nav__item--scan"></span>
                <router-link to="/sign-in">Đăng nhập</router-link></li>
            <li class="nav__item">
                <span class="nav__item--scan"></span>
                <router-link to="/sign-up">Đăng ký</router-link></li>
            <li class="nav__item">
                <span class="nav__item--scan"></span>
                <router-link :to="`/admin/danh-sach-anime`">Quản lí</router-link></li>
        </ul>
    </header>
</template>

<script>
    import { ref } from 'vue';

    export default {
        name: 'Header',
        setup() {
            const lsChoose = ref([{name: 'Trang Chủ', path: ''}, {name: 'Thể Loại', path: 'the-loai'}, {name: 'Top Anime', path: 'top-anime'}, {name: 'Lịch Chiếu', path: 'lich-chieu'}, {name: 'Thông Tin', path: 'thong-tin'}]);
            return {
                lsChoose,
            }
        }
    }
</script>

<style lang="scss">
    header {
        width: inherit;
        display: flex;
        justify-content: space-between;
        box-shadow: 0 0 10px#00000033;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        overflow: hidden;
        background-color: #fff;
        .nav {
            display: flex;
            background-color: #fff;
            &__item {
                position: relative;
                a {
                    position: relative;
                    display: block;
                    color: $base-color;
                    text-decoration: none;
                    padding: 1rem 1rem;
                    z-index: 2;
                    transition: color 0.15s ease-in-out;
                }
                &--scan {
                    position: absolute;
                    width: 100%;
                    height: 6px;
                    z-index: 1;
                    transition: height 0.15s ease-in-out;
                }
                &:nth-child(1) > span {
                    background-color: #ff8b46;
                }
                &:nth-child(2) > span {
                    background-color: cadetblue;
                }
                &:nth-child(3) > span {
                    background-color: #d4f00f;
                }
                &:nth-child(4) > span {
                    background-color: #b1c6ff;
                }
                &:nth-child(5) > span {
                    background-color: #acf0dc;
                }
                &:not(:last-child) {
                    position: relative;
                    &::after {
                        content: '';
                        position: absolute;
                        height: 50%;
                        width: 1px;
                        background-color: $base-color;
                        top: 0;
                        right: -1px;
                        transform: translateY(50%);
                        z-index: 2;
                    }
                }
                &:hover {
                    span {
                        height: 100%;
                    }
                    a {
                        color: #fff;
                    }
                }
            }
        }
    }
</style>