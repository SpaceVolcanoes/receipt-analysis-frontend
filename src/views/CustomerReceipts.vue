<template>
  <table class="table is-striped is-fullwidth">
    <thead>
      <tr>
        <th>Shop name</th>
        <th>#of entries</th>
        <th>Total cost</th>
        <th>Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in $data.data" v-bind:key="entry.id">
        <td>{{ entry.issuer }}</td>
        <td>{{ entry.numberOfEntries }}</td>
        <td>{{ formatCost(entry.totalCostOfEntries) }}</td>
        <td>{{ formatDate(entry.issuedAt) }}</td>
        <td>
          <router-link
            class="button is-link is-outlined"
            :to="'/receipts/' + entry.id"
          >
            View
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Api from "@/components/Api";

export default {
  name: "CustomerReceipts",
  data() {
    return {
      data: {}
    };
  },
  created() {
    Api.get("/api/customers/" + this.$route.params.id + "/receipts")
      .then(request => {
        this.data = request.data;
      })
      .catch(error => {
        console.log(Object.keys(error));
        console.log(error.response);
      });
  },
  methods: {
    formatCost: function(value) {
      if (typeof value === "string" || typeof value === "number") {
        return parseFloat(value).toFixed(2);
      }
      return value;
    },
    formatDate: function(value) {
      if (typeof value === "string") {
        return value.substring(0, 10);
      }
      return value;
    }
  }
};
</script>
