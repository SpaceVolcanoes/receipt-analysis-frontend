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
import Imager from "@/components/Imager";
import Api from "@/components/Api";

export default {
  name: "Home",
  components: {
    Imager
  },
  methods: {
    upload: function(imageData) {
      let parts = imageData.split(",");
      Api.post(
        "/api/receipts/base64",
        { type: parts[0], data: parts[1] },
        {
          headers: { "Content-Type": "application/json; charset=utf-8" }
        }
      )
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
