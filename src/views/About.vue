<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h4 class="title is-4">Say no to poverty!</h4>
    <h5 class="title is-5">Be the master of your purchasing habits!</h5>
    <h1 class="title is-1">Our story so far</h1>
    <h2>Founded in 2020</h2>
  </div>
  <Statistics />
  <StaticReceipt />
</template>

<script>
import Statistics from "@/components/Statistics.vue";
import StaticReceipt from "@/components/StaticReceipt";

export default {
  name: "Home",
  components: {
    Statistics,
    StaticReceipt
  }
};
</script>
