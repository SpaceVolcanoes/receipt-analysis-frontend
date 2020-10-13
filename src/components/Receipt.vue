<template>
  <div class="section">
    <div class="columns">
      <div class="column is-one-fifth">Receipt:</div>
      <div class="column">{{ $data.data.id }}</div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">User:</div>
      <div class="column">{{ $data.data.customer.name }}</div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">Issuer:</div>
      <div class="column">
        <input class="input" type="text" v-model.lazy="$data.data.issuer" />
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">Issued at:</div>
      <div class="column">
        <input class="input" type="text" v-model.lazy="$data.data.issuedAt" />
      </div>
    </div>
  </div>
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
          <Entry :initial="entry" @child-deleted="removeEntry"></Entry>
        </tr>
      </tbody>
    </table>
    <button class="button is-link is-outlined is-fullwidth" @click="addEntry">
      Add new entry
    </button>
  </div>

  <div class="section">
    <img
      v-if="$data.data.fileName"
      :src="'/api/files/' + $data.data.fileName"
    />
  </div>
</template>

<script>
import Entry from "@/components/Entry.vue";
import axios from "axios";

export default {
  name: "Receipt",
  components: {
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
  watch: {
    "data.issuer": function() {
      this.update();
    },
    "data.issuedAt": function() {
      this.update();
    }
  },
  methods: {
    update: function() {
      axios.put("/api/receipt/" + this.data.id, this.data);
    },
    removeEntry: function(entry) {
      this.data.entries = this.data.entries.filter(e => e !== entry);
    },
    addEntry: function() {
      if (this.data.entries === undefined) {
        this.data.entries = [];
      }
      this.data.entries.push({
        name: "",
        cost: 0,
        quantity: 1,
        receipt: { ...this.data }
      });
    }
  }
};
</script>
