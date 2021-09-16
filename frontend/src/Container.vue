<template>
    <div class="container">
        <Header />
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>
    import Header from "./components/Header";
    import Footer from "./components/Footer";
    export default {
        name: 'Container',
        components: {
            Header,
            Footer,
        },
    }
</script>
