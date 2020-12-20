<template>
  <table>
    <tbody>
      <tr>
        <th>Shop name</th>
        <th>#of entries</th>
        <th>Total cost</th>
        <th>Date</th>
      </tr>
      <tr v-for="entry in $data.data" v-bind:key="entry.id">
        <td>{{ entry.issuer }}</td>
        <td>{{ entry.numberOfEntries }}</td>
        <td>{{ entry.totalCostOfEntries }}</td>
        <td>{{ formatDate(entry.issuedAt) }}</td>
        <td><a v-bind:href="'/receipts/' + entry.id">Detailed View</a></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "CustomerReceipts",
  data() {
    return {
      data: {}
    };
  },
  created() {
    axios
      .get("/api/customers/" + this.$route.params.id + "/receipts")
      .then(res => {
        this.data = res["data"];
      })
      .catch(err => {
        console.log(Object.keys(err));
        console.log(err["response"]);
      });
  },
  methods: {
    formatDate: function(value) {
      if (typeof value === "string") {
        return value.substring(0, 10);
      }
      return value;
    }
  }
};
</script>
