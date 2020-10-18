<template>
  <div>
    <h1>Content pages</h1>
    <b-button size="xl" variant="outline-primary" class="mb-3" :to="{name: 'content-page-add'}">
      Add
    </b-button>
    <ul>
      <b-table s :items="pages" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button size="sm" variant="primary" @click="editPage(row.item)" class="mr-1"> Edit </b-button>
          <b-button size="sm" variant="danger" @click="deletePage(row.item)"> Delete </b-button>
        </template>
      </b-table>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "List",
  data() {
    return {
      pages: [],
      fields: ["title", "slug", "actions"],
    };
  },
  methods: {
    deletePage(item) {
      console.log(item)
    },
    editPage(item) {
      this.$router.push({name: 'content-page-edit', params: {slug:item.slug}})
    },
   },
  async mounted() {
    axios.get("http://localhost:5000/api/cms/").then((response) => {
      this.pages = response.data.content;
    });
  },
};
</script>