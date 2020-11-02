<template>
  <div id="imagers">
    <div class="image-container">
      <img
        class="imager"
        src=""
        style="min-width: 300px; min-height: 200px; width: 300px;"
      />
    </div>
  </div>
</template>

<style scoped>
@import "../assets/imagerJs.css";

.imager-edit-container .toolbar {
  position: absolute;
}

#imagers {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.imager {
  display: inline-block;
  margin-top: 30px;
  margin-bottom: 100px;
}

.image-container {
  min-width: 300px;
  margin-right: 30px;
  text-align: left;
}
</style>

<script>
export default {
  name: "Imager",
  created() {
    this.$loadScript("https://code.jquery.com/jquery-1.10.1.min.js").then(
      () => {
        this.$loadScript(
          "https://code.jquery.com/jquery-migrate-1.2.1.min.js"
        ).then(() => {
          this.$loadScript("../external/imager/imagerJs.js").then(() => {
            this.setup();
          });
        });
      }
    );
  },
  emits: ["image-saved"],
  methods: {
    setup: function() {
      // eslint-disable-next-line no-undef
      let $ = jQuery;
      let that = this;

      let options = {
        plugins: [
          "Rotate",
          "Crop",
          "Resize",
          "Save",
          "Toolbar",
          "Delete",
          "Undo"
        ],
        editModeCss: {},
        pluginsConfig: {
          Delete: {
            fullRemove: false
          }
        },
        contentConfig: {
          saveImageData: function(imageId, imageData) {
            try {
              that.$emit("image-saved", imageData);
              localStorage.setItem("image_" + imageId, imageData);
            } catch (err) {
              console.error(err);
            }
          }
        }
      };

      // eslint-disable-next-line no-undef
      let imager = new ImagerJs.Imager(
        $(".image-container").find("img"),
        options
      );

      imager.startSelector();

      imager.on("editStart", function() {
        imager.$imageElement.css({
          minWidth: "auto",
          minHeight: "auto"
        });
      });
    }
  }
};
</script>
