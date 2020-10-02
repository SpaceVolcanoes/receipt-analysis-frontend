<template>
  Select file to upload MART:
  {{ $route.params.id }}
  <form action="">
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload file" name="submit">
  </form>
</template>

<script>
export default {
  name: "Receipt"
};
</script>
