<template>
    <div class="card box__sd">
        <router-link class="card__directly" :to="`/movie/${movie.label}`"></router-link>
        <img class="card__img" v-bind:src="`http://localhost:5000${movie.image}`" alt="card">
        <span class="card__rate">9.8</span>
        <img class="card__play" src="~@/assets/img/playOv.png" alt="">
        <span class="card__name">{{ movie.name }}</span>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: ['movie'],
}
</script>

<style lang="scss">
    @include card;
</style>