<template>
<main-layout>
  <router-view />
</main-layout>
</template>

<script>
import MainLayout from './layouts/MainLayout'

export default {
  name: "App",
  components: {
    MainLayout
  }
};
</script>