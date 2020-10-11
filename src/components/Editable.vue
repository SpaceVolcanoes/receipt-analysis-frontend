<template>
  <li>
    {{ type }}:
    <input
      v-if="$data.editing"
      v-model="$data.innerContent"
      @blur="
        $data.editing = false;
        this.$emit('updateInner', $data.innerContent);
      "
      @keyup.enter="
        $data.editing = false;
        this.$emit('updateInner', $data.innerContent);
      "
    />
    <label v-else @click="$data.editing = true">{{
      $data.innerContent.substring(0, this.limit)
    }}</label>
  </li>
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
      editing: false,
      innerContent: this.content.slice()
    };
  }
};
</script>
