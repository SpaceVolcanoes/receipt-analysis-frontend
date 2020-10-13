<template>
  <form action="" ref="ReceiptUpload">
    <div class="field">
      <label class="label">Select file to upload</label>
      <div class="control">
        <div class="file is-boxed">
          <label class="file-label">
            <input
              class="file-input"
              @change="image = $event.target.files[0]"
              type="file"
              name="file"
              id="fileToUpload"
              accept="image/*"
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">Choose a file…</span>
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button
          class="button is-link"
          type="submit"
          @click.prevent="upload"
          name="submit"
        >
          Upload file
        </button>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <img v-if="$data.imageSrc" :src="$data.imageSrc" />
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      image: false,
      imageSrc: false
    };
  },
  watch: {
    image: function() {
      const reader = new FileReader();
      let that = this;
      reader.onload = function() {
        that.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.image);
    }
  },
  methods: {
    upload: function() {
      const formData = new FormData(this.$refs.ReceiptUpload);
      axios({
        method: "post",
        url: "/api/receipt",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      }).then(response => {
        const id = response.data;
        this.$router.push({ name: "ReceiptDetail", params: { id } });
      });
    }
  }
};
</script>
