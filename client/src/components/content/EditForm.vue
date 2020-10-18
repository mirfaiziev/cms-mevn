<template>
  <b-form @submit.prevent="onSubmit" class="form-edit-content">
    <b-alert variant="danger" show v-if="this.error.message"
      >Error: {{ this.error.message }}
    </b-alert>

    <b-form-group
      id="form-group-input-title"
      label="Title:"
      label-for="form-input-title"
    >
      <b-form-input
        id="form-input-title"
        v-model="form.title"
        type="text"
        required
        placeholder="Enter title"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="form-group-input-slug"
      label="Slug:"
      label-for="form-input-slug"
    >
      <b-form-input
        id="form-input-slug"
        v-model="form.slug"
        type="text"
        required
        placeholder="Enter slug"
        :disabled="this.disableEditSlug"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="form-group-input-supported-languages"
      label="Supported languages:"
      label-for="form-input-supported-languages"
    >
      <b-form-checkbox-group
        id="checkbox-suppored-languages"
        :options="allowedLanguages"
        v-model="contentLanguages"
      ></b-form-checkbox-group>
    </b-form-group>

    <b-tabs content-class="mt-3">
      <ContentTab
        v-for="languageCode in contentLanguages"
        v-bind:languageCode="languageCode"
        v-bind:formData="form"
      />
    </b-tabs>

    <b-button
      type="submit"
      variant="primary"
      block
      class="mt-3"
      :disabled="this.loading"
      >Submit</b-button
    >
  </b-form>
</template>

<script>
import axios from "axios";
import ContentTab from "@/components/content/ContentTab";

export default {
  name: "EditForm",
  props: ["loading", "error", "formData", "action"],
  components: { ContentTab },
  data() {
    return {
      disableEditSlug: this.action === "edit",
      allowedLanguages: [],
      contentLanguages: [],
    };
  },

  computed: {
    form() {
      return this.formData;
    },
  },

  watch: {
    formData(newValue, oldValue) {
      this.contentLanguages = Object.keys(this.form.content)
    },
    contentLanguages(newValue, oldValue) {
      const contentKeys = Object.keys(this.form.content)
      contentKeys.forEach((key) => {
          if (newValue.includes(key) === false) {
            delete this.form.content[key]
          }
      });
    }
  },
  methods: {
    onSubmit(e) {
      this.$emit("formSubmited", this.form);
    },
  },


  async mounted() {
   /// console.log("mounted", this.formData.content);
    axios
      .get("http://localhost:5000/api/cms/allowed-languages")
      .then((response) => {
        this.allowedLanguages = response.data;
      })
      .catch((e) => console.log(e));
  },
};
</script>