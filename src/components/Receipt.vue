<template>
  <ul>
    <li>Receipt: {{ $data.data.id }}</li>
    <li>User: {{ $data.data.userId }}</li>
    <Editable @updateInner="issuerUpdate" :content="$data.data.issuer" type="Issuer" />
    <Editable @updateInner="issuedAtUpdate" :content="$data.data.issuedAt" type="Issued at" limit="10" />
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
  <img :src="'/api/files/' + $data.data.fileName" />
</template>

<script>
import Editable from "@/components/Editable.vue";
import axios from "axios";

export default {
  name: "Receipt",
  components: {
    Editable
  },
  props: {},
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
      .get("/api/receipt/" + this.$route.params.id)
      .then(res => {
        this.data = res["data"];
      })
      .catch(err => {
        alert(err);
      });
  },
  methods: {
    update: function() {
      axios.put("/api/receipt/" + this.data.id, this.data);
    },
    issuerUpdate: function(newValue) {
      this.data.issuer = newValue;
      this.update();
    },
    issuedAtUpdate: function(newValue) {
      this.data.issuedAt = newValue;
      this.update();
    },
  }
};
</script>
