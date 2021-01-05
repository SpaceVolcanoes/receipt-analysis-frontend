<template>
  <div class="section">
    <h3 class="title is-3">Check out example below</h3>
    <div class="columns">
      <div class="column is-one-fifth">Issuer:</div>
      <div class="column">{{ issuer }}</div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">User:</div>
      <div class="column">{{ customer.name }}</div>
    </div>
    <table class="table is-hoverable is-half-width">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" v-bind:key="entry.name">
          <td>{{ entry.name }}</td>
          <td>{{ entry.cost }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <img v-if="fileName" :src="'/api/files/' + fileName" />
  </div>
</template>

<script>
import Api from "@/components/Api";

export default {
  name: "StaticReceipt",
  components: {},
  props: {},
  data() {
    return {
      id: 0,
      customer: {},
      issuer: "",
      issuedAt: "",
      fileName: false,
      entries: []
    };
  },
  created() {
    Api.get("/api/receipts/4")
      .then(res => {
        Object.assign(this, res["data"]);
      })
      .catch(err => {
        console.log("2", err);
      });
  }
};
</script>
