<template>
  <form action="" ref="ReceiptUpload">
    <div class="field">
      <label class="label">Select file to upload</label>
      <div class="control">
        <div class="file is-boxed">
          <label class="file-label">
            <input
              class="file-input"
              @change="image = e.target.file[0]"
              type="file"
              name="file"
              id="fileToUpload"
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
        <button class="button is-link" type="submit" @click.prevent="upload" name="submit">
          Upload file
        </button>
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
      id: false
    };
  },
  methods: {
    upload: function() {
      const formData = new FormData(this.$refs.ReceiptUpload);
      axios({
        method: "post",
        url: "/api/files",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      }).then(resp => {
        this.id = resp.data;
      });
    }
  }
};
</script>
