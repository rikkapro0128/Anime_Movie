<template>
  <div class="container">
    <Header />
    <router-view v-slot="{ Component, route }">
      <!-- Use any custom transition and fallback to `fade` -->
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "Container",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped lang="scss"></style>
