<template>
  <h1 class="title">
    {{ $route.name }}
  </h1>
  <Navigation />
  <router-view />
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  components: { Navigation }
};
</script>
