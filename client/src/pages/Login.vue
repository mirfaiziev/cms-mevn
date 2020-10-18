<template>
  <div class="text-center col-xs">
    <b-form @submit.prevent="onSubmit" class="form-login">
      <h1>Login</h1>

      <b-form-input
        id="form-input-login"
        class="form-control"
        placeholder="Login"
      ></b-form-input>

      <b-form-input
        id="form-input-password"
        class="form-control"
        type="password"
        placeholder="Password"
      ></b-form-input>

      <b-button type="submit" variant="primary" block class="mt-3">Submit</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  name: "Login",
  methods: {
    onSubmit() {
      console.log("hello1");
    },
  },
};
</script>
<style scoped>
.form-login {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>