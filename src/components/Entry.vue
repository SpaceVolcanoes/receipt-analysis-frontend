<template>
  <td>
    <input class="input" type="text" v-model.lazy="$data.name" />
  </td>
  <td>
    <input class="input" type="text" v-model.lazy="$data.cost" />
  </td>
  <td>
    <button class="button is-link is-outlined is-danger" @click="deleteEntry">delete</button>
  </td>
</template>

<script>
import axios from "axios";

export default {
  name: "Entry",
  props: {
    initial: Object
  },
  data() {
    const data = {
      id: Number,
      name: String,
      cost: Number
    };
    if (this.initial) {
      Object.assign(data, this.initial);
    }
    return data;
  },
  created() {
    if (this.initial) {
      return;
    }
    axios
      .get("/api/entry/" + this.$route.params.id)
      .then(res => {
        Object.assign(this, res["data"]);
      })
      .catch(err => {
        console.log(err);
      });
  },
  emits: ["child-deleted"],
  watch: {
    name: function() {
      console.log("updated name", this.name);
    },
    cost: function() {
      console.log("updated cost", this.cost);
    }
  },
  methods: {
    deleteEntry: function() {
      this.$emit("child-deleted", this.initial);
    }
  }
};
</script>
