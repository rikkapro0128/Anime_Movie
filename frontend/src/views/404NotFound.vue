<template>
    <div class="not-found">
        <div class="char">
            <span class="not-found__react">Ara ara!</span>
            <div class="char__ani"></div>
        </div>
        <h1 class="not-found__tl">Trang không có dữ liệu!</h1>
        <router-link class="not-found__redirect" to="/">Quay trở lại trang chủ ->>!</router-link>
    </div>
</template>

<script>
    export default {};
</script>

<style lang="scss" scoped>
    .not-found {
        background-color: $main-color;
        width: inherit;
        height: 80vh;
        background-size: cover;
        margin: 2rem 0;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        box-shadow: 0 0 10px $main-color;
        background-image: url('~@/assets/img/bg_tr.png');
        background-size: 5%;
        .char {
            position: absolute;
            top: 0px;
            transform: translateY(25%);
            span {
                display: block;
                width: 100px;
                height: 72px;
                background-repeat: no-repeat;
                background-size: 100%;
                background-image: url('~@/assets/img/box_mess.png');
                line-height: 62px;
                text-align: center;
                color: #fff;
                position: relative;
                right: -100px;
            }
            &__ani {
                width: 100px;
                height: 170px;
                background-repeat: no-repeat;
                background-size: 100%;
                background-image: url('~@/assets/img/main_sd_pc.png');
            }
        }
        &__tl {
            position: relative;
            z-index: 1;
            font-size: 5rem;
            color: #fff;
            text-transform: capitalize;
        }
        &__redirect {
            position: relative;
            z-index: 1;
            color: #fff;
            font-size: 1.4rem;
            text-decoration: none;
            margin-top: 1rem;
            transition: all 0.2s ease-in-out;
            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
