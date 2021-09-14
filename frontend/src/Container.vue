<template>
    <div class="container">
        <Header />
        <router-view></router-view>
        <!-- <router-view name="MovieByLabel"></router-view> -->
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
