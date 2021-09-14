<template>
    <div class="not-found">
        <div class="not-found__overlay"></div>
        <h1 class="not-found__tl">404 Not Found!</h1>
        <router-link class="not-found__redirect" to="/">Redirect Home Page!</router-link>
    </div>
</template>

<script>
    export default {};
</script>

<style lang="scss" scoped>
    .not-found {
        background-image: url('~@/assets/img/404-not-found.jpg');
        width: inherit;
        height: 80vh;
        background-size: cover;
        background-repeat: no-repeat;
        margin: 1rem 0;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        &__overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
        }
        &__tl {
            position: relative;
            z-index: 1;
            font-size: 5rem;
            color: #f18312;
        }
        &__redirect {
            position: relative;
            z-index: 1;
            color: #3fff00;
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
