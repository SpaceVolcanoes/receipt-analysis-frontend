<template>
  <div id="imagers">
    <div class="image-container">
      <img class="imager" src="" :key="componentKey" />
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
  min-width: 300px;
  min-height: 200px;
  width: 400px;
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
  data() {
    return {
      componentKey: 0
    };
  },
  created() {
    Object.keys(localStorage).forEach(function(key) {
      if (key.startsWith("image_")) {
        localStorage.removeItem(key);
      }
    });

    this.componentKey += 1;
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
  beforeUnmount() {
    // eslint-disable-next-line no-undef
    $(
      ".toolbar-tooltip, .imager-edit-container, .imager-selector-container, .modaljs-overlay, .modaljs-wrapper"
    ).remove();

    this.$unloadScript("../external/imager/imagerJs.js");
    this.$unloadScript("https://code.jquery.com/jquery-migrate-1.2.1.min.js");
    this.$unloadScript("https://code.jquery.com/jquery-1.10.1.min.js");
  },
  emits: ["image-saved"],
  methods: {
    setup: function() {
      // eslint-disable-next-line no-undef
      let $ = jQuery;
      let that = this;

      let options = {
        plugins: ["Rotate", "Crop", "Save", "Toolbar", "Delete", "Undo"],
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
