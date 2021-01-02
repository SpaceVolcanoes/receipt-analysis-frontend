<template>
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
          <Entry :edit="true" :initial="entry" @child-deleted="removeEntry"></Entry>
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
