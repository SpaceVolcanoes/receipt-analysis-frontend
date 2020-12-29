<template>
  <td>
    <input class="input" type="text" v-model.lazy="$data.name" />
  </td>
  <td>
    <input class="input" type="text" v-model.lazy="$data.cost" />
  </td>
  <td>
    <button class="button is-link is-outlined is-danger" @click="deleteEntry">
      delete
    </button>
  </td>
</template>

<script>
import Api from "@/components/Api";

export default {
  name: "Entry",
  props: {
    initial: Object
  },
  data() {
    const data = {
      name: "",
      cost: 0
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
    Api.get("/api/entries/" + this.$route.params.id)
      .then(res => {
        Object.assign(this, res["data"]);
      })
      .catch(err => {
        console.log(err);
      });
  },
  emits: ["child-deleted"],
  watch: {
    name: function(newValue, oldValue) {
      this.update(err => {
        console.error(err);
        this.cost = oldValue;
      });
    },
    cost: function(newValue, oldValue) {
      this.update(err => {
        console.error(err);
        this.cost = oldValue;
      });
    }
  },
  methods: {
    create: function(onError) {
      Api.post("/api/entries/", {
        category: this.category,
        cost: this.cost,
        name: this.name,
        quantity: this.quantity,
        receipt: this.receipt
      })
        .then(res => {
          this.id = res["data"];
        })
        .catch(onError);
    },
    update: function(onError) {
      if (this.id) {
        Api.put("/api/entries/" + this.id, {
          category: this.category,
          cost: this.cost,
          name: this.name,
          quantity: this.quantity
        }).catch(onError);
      } else {
        this.create(onError);
      }
    },
    deleteEntry: function() {
      this.$emit("child-deleted", this.initial);
      if (this.id) {
        Api.delete("/api/entries/" + this.id);
      }
    }
  }
};
</script>
