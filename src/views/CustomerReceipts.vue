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
        <td>{{ entry.issuedAt.substring(0, 10) }}</td>

        <td><a href="/receipt">Detailed View</a></td>
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
      .get("http://localhost:8080/customer/1/receipts")
      .then(res => {
        this.data = res["data"];
      })
      .catch(err => {
        alert(Object.keys(err));
        alert(err["response"]);
      });
  }
};
</script>

<style scoped>
tr {
  font-size: 14pt;
  text-align: left;
  color: gray;
}
</style>
