<template>
  <b-tab :title="this.languageCode" active>
      <b-form-textarea
        :id="this.textareaId"
        rows="10"
        required
        placeholder="Enter content"
        v-model=form.content[languageCode]
      ></b-form-textarea>
  </b-tab>
</template>

<script>
export default {
  name: "ContentTab",
  props: ["languageCode", 'formData'],
  computed: {
    textareaId() {
      return "form-input-content-" + this.languageCode
    },
    form() {
      return this.formData
    },
  },
};
</script>