<template>
  <div class="section">
    <div class="columns">
      <div class="column is-one-fifth">Receipt:</div>
      <div class="column">{{ id }}</div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">User:</div>
      <div class="column">{{ customer.name }}</div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">Issuer:</div>
      <div class="column">
        <input class="input" type="text" v-model.lazy="issuer" />
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">Issued at:</div>
      <div class="column">
        <input class="input" type="text" v-model.lazy="issuedAt" />
      </div>
    </div>
    <div class="columns">
      <div class="column"></div>
      <div class="column is-one-fifth">
        <button
          class="button is-link is-outlined is-danger is-pulled-right"
          @click="deleteReceipt"
        >
          delete
        </button>
      </div>
    </div>
  </div>
  <div class="section">
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" v-bind:key="entry.id">
          <Entry :initial="entry" @child-deleted="removeEntry"></Entry>
        </tr>
      </tbody>
    </table>
    <button class="button is-link is-outlined is-fullwidth" @click="addEntry">
      Add new entry
    </button>
  </div>

  <div class="section">
    <img v-if="fileName" :src="'/api/files/' + fileName" />
  </div>
</template>

<script>
import Entry from "@/components/Entry";
import Api from "@/components/Api";

export default {
  name: "Receipt",
  components: {
    Entry
  },
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
    Api.get("/api/receipts/" + this.$route.params.id)
      .then(res => {
        Object.assign(this, res["data"]);
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    issuer: function() {
      this.update();
    },
    issuedAt: function() {
      this.update();
    }
  },
  methods: {
    update: function() {
      Api.put("/api/receipts/" + this.id, {
        issuer: this.issuer,
        issuedAt: this.issuedAt
      }).catch(err => {
        console.log(err);
      });
    },
    removeEntry: function(entry) {
      this.entries = this.entries.filter(e => e !== entry);
    },
    addEntry: function() {
      this.entries.push({
        name: "",
        cost: 0,
        quantity: 1,
        receipt: { id: this.id }
      });
    },
    deleteReceipt: function() {
      Api.delete("/api/receipts/" + this.id).then(() => {
        this.$router.push({
          name: "CustomerReceipts",
          params: { id: this.customer.id }
        });
      });
    }
  }
};
</script>
