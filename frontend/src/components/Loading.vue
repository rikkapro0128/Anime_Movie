<template>
    <teleport v-if="toggle" to="body">
        <div class="loading"></div>
    </teleport>
</template>

<script>
export default {
    props: {
        toggle: {
            type: Boolean,
        }
    },
    setup() {
        
    },
}
</script>

<style scoped lang="scss">
    .loading {
        width: 16rem;
        height: 18rem;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        background-image: url('~@/assets/img/loading.gif');
        background-repeat: no-repeat;
    }
</style>
