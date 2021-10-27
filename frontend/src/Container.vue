<template>
  <div class="container">
    <Header />
    <router-view v-slot="{ Component, route }">
      <!-- Use any custom transition and fallback to `fade` -->
      <transition :name="route.meta.transition || 'fade'">
        <component :key="$route.fullPath" :is="Component" />
      </transition>
    </router-view>
    <Tool />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tool from "./components/Tool";
export default {
  name: "Container",
  components: {
    Header,
    Footer,
    Tool
  }
};
</script>
