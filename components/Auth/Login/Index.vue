<template>
  <div>
     <v-container class="grey lighten-5 mainLogo">
      <img src="../../../assets/logo_big.png">
    </v-container>
    <v-container class="grey lighten-5 loginForm">
      <div class="loginTitle">
        <svg style="width:65px;height:65px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" />
        </svg><br>
        Login</div>
    <form @submit.prevent="login">
      <div class="mt-4">
        <input
          type="email"
          placeholder="Email"
          class="form-control"
          id="email"
          v-model="loginData.email"
          aria-describedby="emailHelp"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="loginData.password"
          class="fields form-control"
          id="password"
        />
      </div>
      <button type="submit" class="btn w-100 registerButton">Login</button>
    </form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginData
        });
        this.$router.push("/");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style scoped>
.fields{
  margin-top: 10px;
}
</style>
