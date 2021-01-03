<template>
  <div class="section">
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" v-bind:key="entry.id">
          <Entry :initial="entry" @child-deleted="removeEntry"></Entry>
          <td>
            <router-link class="button is-link is-outlined" :to="'/receipts/' + entry.receiptId">
              Receipt
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Entry from "@/components/Entry";
import Api from "@/components/Api";

export default {
  name: "EntryDetail",
  components: {
    Entry
  },
  props: {},
  data() {
    return {
      entries: []
    };
  },
  created() {
    Api.get("/api/entries/" + this.$route.params.id + "/similar")
      .then(res => {
        Object.assign(this.entries, res["data"]);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    removeEntry: function(entry) {
      this.entries = this.entries.filter(e => e !== entry);
    },
  }
}
</script>
