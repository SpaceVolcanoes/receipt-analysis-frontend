<template>
  <ul>
    <li>Receipt: {{ $data.data.id }}</li>
    <li>User: {{ $data.data.userId }}</li>
    <li>
      Issuer: <input v-if="editing.issuer" v-model="$data.data.issuer"
        @blur="editing.issuer = false; sendData()"
        @keyup.enter="editing.issuer = false; sendData()">
      <label v-else @click="editing.issuer = true">{{ $data.data.issuer }}</label>
    </li>
    <li>
      Issued at: <input v-if="editing.issuedAt" v-model="$data.data.issuedAt"
        @blur="editing.issuedAt = false; sendData()"
        @keyup.enter="editing.issuedAt = false; sendData()">
      <label v-else @click="editing.issuedAt = true">{{ $data.data.issuedAt.substring(0, 10) }}</label>
    </li>
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
      data: {},
      editing: {
        issuer: false,
        issuedAt: false
      }
    };
  },
  created() {
    axios
      .get("http://localhost:8080/receipt/2")
      .then(res => {
        this.data = res["data"];
      })
      .catch(err => {
        alert(err);
      });
  },
  methods: {
    sendData: function() {
      axios.put("http://localhost:8080/receipt/2", this.data);
    }
  }
};
</script>
