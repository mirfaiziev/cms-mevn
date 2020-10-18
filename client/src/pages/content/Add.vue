<template>
  <div>
    <h1>Add page</h1>
    <EditForm
      v-on:formSubmited="onSubmit"
      v-bind:loading="this.loading"
      v-bind:error="this.error"
      v-bind:formData="this.form"
      action="add"
    />
  </div>
</template>

<script>
import axios from "axios";
import EditForm from "@/components/content/EditForm";

export default {
  name: "Add",
  components: {
    EditForm,
  },
  data() {
    return {
      form: {
        title: "",
        slug: "",
        content: {},
      },
      loading: false,
      error: {},
    };
  },
  methods: {
    async onSubmit(form) {
      console.log(form)
      this.loading = true;
      axios
        .post("http://localhost:5000/api/cms/", form)
        .then((response) => {
          this.error = {};
        })
        .catch((e) => {
          this.error = e;
        })
        .finally(() => {
          this.loading = false;
        })
    },
  },
};
</script>