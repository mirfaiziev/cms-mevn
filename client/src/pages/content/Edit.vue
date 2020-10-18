<template>
  <div>
    <h1>Edit page</h1>
    <EditForm
      v-on:formSubmited="onSubmit"
      v-bind:loading="this.loading"
      v-bind:error="this.error"
      v-bind:formData="this.form"
      action='edit'
    />
  </div>
</template>

<script>
import axios from "axios";
import EditForm from "@/components/content/EditForm";

export default {
  name: "Edit",
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
      const slug = this.$router.currentRoute.params.slug;
      this.loading = true;
      axios
        .put("http://localhost:5000/api/cms/"+slug, form)
        .then((response) => {
          this.error = {};
        })
        .catch((e) => {
          this.error = e;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  async mounted() {
    const slug = this.$router.currentRoute.params.slug;

    axios
      .get("http://localhost:5000/api/cms/" + slug)
      .then((response) => {
        this.form = response.data;
      })
      .catch((e) => {

      });
  },
};
</script>