<template>
  <section v-if="active">
    <div v-if="loading" class="notification is-info">Uploading image...</div>
    <br><br>
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
  </section>
  <home-examples v-else></home-examples>
</template>

<script>
import HomeExamples from "@/components/HomeExamples";
import Session from "@/components/Session";
import Imager from "@/components/Imager";
import Api from "@/components/Api";

export default {
  name: "Home",
  data() {
    return {
      loading: false
    };
  },
  components: {
    Imager,
    HomeExamples
  },
  computed: {
    active() {
      return Session.state.active;
    }
  },
  methods: {
    upload: function(imageData) {
      let parts = imageData.split(",");
      this.loading = true;
      Api.post(
        "/api/receipts/base64",
        { type: parts[0], data: parts[1] },
        {
          headers: { "Content-Type": "application/json; charset=utf-8" }
        }
      )
        .then(response => {
          const id = response.data;
          this.loading = false;
          this.$router.push({ name: "ReceiptDetail", params: { id } });
        })
        .catch(error => {
          this.loading = false;
          this.eventBus.emit("show-alert", {
            message: "Unable to save the image: " + error.message,
            level: "danger"
          });
        });
    }
  }
};
</script>
