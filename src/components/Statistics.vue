<template>
  <div class="section">
    <div class="columns">
      <div class="column is-one-fifth">Amount of customers:</div>
      <div class="column">{{ customerAmount }}</div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">Amount of receipts:</div>
      <div class="column">{{ receiptAmount }}</div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">Amount of entries:</div>
      <div class="column">{{ entryAmount }}</div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">Average entries per receipt:</div>
      <div class="column">{{ entriesPerReceipt }}</div>
    </div>
  </div>
</template>

<script>
import Api from "@/components/Api";

export default {
  name: "Statistics",
  components: {},
  props: {},
  data() {
    return {
      customerAmount: 0,
      receiptAmount: 0,
      entryAmount: 0,
      entriesPerReceipt: 0
    };
  },
  created() {
    Api.get("/api/statistics")
      .then(response => {
        Object.assign(this, response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
