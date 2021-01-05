<template>
  <h1 class="title">
    {{ $route.name }}
  </h1>
  <Navigation />
  <Alert />
  <router-view />
</template>

<script>
import Navigation from "./components/Navigation";
import Alert from "./components/Alert";
export default {
  components: { Navigation, Alert }
};
</script>
