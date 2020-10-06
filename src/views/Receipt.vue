<template>
  <ul>
    <li>Receipt: {{ $data.data.id }}</li>
    <li>User: {{ $data.data.userId }}</li>
    <li>Issuer: {{ $data.data.issuer }}</li>
  </ul>
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
