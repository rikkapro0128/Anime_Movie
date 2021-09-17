<template>
    <header>
        <ul class="nav">
            <li class="nav__item" v-for="item in lsChoose" v-bind:key="item">
                <span class="nav__item--scan"></span>
                <router-link :to="'/' + item.path">
                    {{ item.name }}
                </router-link></li>
        </ul>
        <div class="nav__space">
            <input type="text" placeholder="Tên anime?">
            <button class="btn">Tìm kiếm
                <i class="fas fa-search"></i>
            </button>
        </div>
        <ul class="nav">
            <li class="nav__item">
                <span class="nav__item--scan"></span>
                <router-link to="/dang-nhap">Đăng nhập</router-link></li>
            <li class="nav__item">
                <span class="nav__item--scan"></span>
                <router-link to="/dang-ky">Đăng ký</router-link></li>
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
        box-shadow: 0 0 10px $main-color;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        overflow: hidden;
        background-color: $main-color;
        .nav {
            display: flex;
            &__space {
                display: inline-block;
                width: 100%;
                border-bottom-left-radius: 20px;
                border-bottom-right-radius: 20px;
                background-color: #fff;
                position: relative;
                display: flex;
                align-items: center;
                input {
                    display: inline-block;
                    padding: 0.3rem 1rem;
                    outline: none;
                    border: 2px dotted $main-color;
                    border-radius: 20px;
                    width: 100%;
                    margin: 0 0.5rem;
                    font-size: 1.2rem;
                    color: $base-color;
                    font-weight: 600;
                    font-style: italic;
                    &::placeholder {
                        color: #ccc;
                    }
                }
                button {
                    margin-right: 0.5rem;
                    padding: 0.5rem;
                    border-top-left-radius: 20px;
                    border-bottom-right-radius: 20px;
                }
            }
            &__item {
                background-color: $main-color;
                position: relative;
                a {
                    position: relative;
                    display: block;
                    color: #fff;
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
                    transition: height 0.2s ease-in-out;
                }
                span {
                    background-color: #fff;
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
                        border-bottom-left-radius: 20px;
                        border-bottom-right-radius: 20px;
                    }
                    a {
                        color: $base-color;
                    }
                }
            }
        }
    }
</style>