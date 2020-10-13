<template>
  <div class="columns">
    <div v-if="type" class="column is-one-fifth">
      <label>{{ type }}:</label>
    </div>
    <div class="column">
      <input
        :class="editing"
        type="text"
        v-model="$data.innerContent"
        @focusin="$data.editing = 'input is-focused'"
        @blur="
          $data.editing = 'input';
          this.$emit('updateInner', $data.innerContent);
        "
        @keyup.enter="
          $data.editing = 'input';
          this.$emit('updateInner', $data.innerContent);
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Editable",
  props: {
    content: String,
    type: String,
    limit: {
      type: Number,
      default: Infinity
    }
  },
  data() {
    return {
      editing: "input",
      innerContent: this.content.slice()
    };
  }
};
</script>
