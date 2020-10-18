<template>
  <div class="container">
   <b-navbar toggleable="lg" variant="light">
      <b-navbar-brand>Cms</b-navbar-brand>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          
        <b-nav-item><router-link to="/login">Login</router-link></b-nav-item>
        <b-nav-item><router-link to="/register">Register</router-link></b-nav-item>
         
        </b-navbar-nav>
    </b-navbar>
    <slot>Loading</slot>
  </div>
</template>

<script>
export default {
    name: 'MainLayout'
}
</script>