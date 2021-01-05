<template>
  <div class="section">
    <div class="columns">
      <div class="column has-text-centered">
        <img alt="Vue logo" src="../assets/logo.png" />
        <h4 class="title is-4">Say no to poverty!</h4>
        <h5 class="title is-5">Be the master of your purchasing habits!</h5>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h1 class="title is-1">Our story so far</h1>
        <h2>Founded in 2020</h2>
      </div>
    </div>
  </div>
  <Statistics />
  <StaticReceipt />
</template>

<script>
import Statistics from "@/components/Statistics";
import StaticReceipt from "@/components/StaticReceipt";

export default {
  name: "Home",
  components: {
    Statistics,
    StaticReceipt
  }
};
</script>
