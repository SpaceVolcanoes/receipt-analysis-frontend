<template>
  <form action="" ref="ReceiptUpload">
    <div class="field">
      <label class="label">Select file to upload</label>
      <div class="control">
        <div class="file is-boxed">
          <Imager @image-saved="upload" />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import Imager from "@/components/Imager.vue";

export default {
  name: "Home",
  components: {
    Imager
  },
  methods: {
    upload: function(imageData) {
      let parts = imageData.split(",");

      axios({
        method: "post",
        url: "/api/receipts/base64",
        data: { type: parts[0], data: parts[1] },
        config: {
          headers: { "Content-Type": "application/json; charset=utf-8" }
        }
      })
        .then(response => {
          const id = response.data;
          this.$router.push({ name: "ReceiptDetail", params: { id } });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
