<template>
  <table>
    <tbody>
      <tr v-for="image in $data.data" v-bind:key="image.id">
        <td>
          <div class="imageInList">
            <img :src="'/api/files/' + image" />
          </div>
          {{ image }}
        </td>
        <td>
          <button class="button is-link is-outlined is-danger" @click="deleteImage(image)">
            delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Api from "@/components/Api";

export default {
  name: "ImageList",
  data() {
    return {
      data: {}
    };
  },
  created() {
    Api.get("/api/files")
      .then(request => {
        this.data = request.data.filter((filename) => {
          if (filename.endsWith(".jpeg") || filename.endsWith(".png")) {
            return filename;
          }
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  },
  methods: {
    deleteImage: function(filename) {
      Api.delete("/api/files/" + filename);
      this.data = this.data.filter(e => e !== filename);
    }
  }
};
</script>

<style>
.imageInList {
  width: 400px;
  height: 400px;
  border: #CCCBCB solid 1px;
  border-radius: 4px;
  margin-right: 20px;
  overflow: hidden;
}
</style>
