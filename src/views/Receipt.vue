<template>
  <ul>
    <li>Receipt: {{ $data.data.id }}</li>
    <li>User: {{ $data.data.userId }}</li>
    <li>Issuer: {{ $data.data.issuer }}</li>
    <li>Issued at: {{ $data.data.issuedAt.substring(0, 10) }}</li>
  </ul>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in $data.data.entries" v-bind:key="entry.id">
        <td>{{ entry.name }}</td>
        <td>{{ entry.cost }}</td>
      </tr>
    </tbody>
  </table>
  <img :src="'http://localhost:8080/files/' + $data.data.fileName" />
</template>

<script>
import axios from "axios";

export default {
  name: "Receipt",
  data() {
    return {
      data: {}
    };
  },
  created() {
    axios
      .get("http://localhost:8080/receipt/2")
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
