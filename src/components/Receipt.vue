<template>
  <div class="columns">
    <div class="column is-one-fifth">Receipt:</div>
    <div class="column">{{ $data.data.id }}</div>
  </div>
  <div class="columns">
    <div class="column is-one-fifth">User:</div>
    <div class="column">{{ $data.data.customer.name }}</div>
  </div>
  <Editable
    @updateInner="issuerUpdate"
    v-if="$data.data.issuer"
    :content="$data.data.issuer"
    type="Issuer"
  />
  <Editable
    @updateInner="issuedAtUpdate"
    v-if="$data.data.issuedAt"
    :content="$data.data.issuedAt"
    type="Issued at"
    :limit="10"
  />

  <div class="section">
    <table class="table is-hoverable table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in $data.data.entries" v-bind:key="entry.id">
          <Entry
            :initial="entry"
            @child-deleted="removeEntry"
          ></Entry>
        </tr>
      </tbody>
    </table>
    <button class="button is-link is-outlined is-fullwidth" @click="addEntry">Add new entry</button>
  </div>

  <div class="section">
    <img v-if="$data.data.fileName" :src="'/api/files/' + $data.data.fileName" />
  </div>
</template>

<script>
import Editable from "@/components/Editable.vue";
import Entry from "@/components/Entry.vue";
import axios from "axios";

export default {
  name: "Receipt",
  components: {
    Editable,
    Entry
  },
  props: {},
  data() {
    return {
      data: {
        customer: {}
      },
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
        console.log(err);
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
    removeEntry: function(entry) {
      this.data.entries = this.data.entries.filter(e => e !== entry);
    },
    addEntry: function() {
      this.data.entries.push({ name: "", cost: 0, quantity: 1 });
    }
  }
};
</script>
