<template>
  <div>
    <UIBigLogo />
    <v-container class="grey lighten-5 loginForm">
      <div class="loginTitle">
        <svg style="width:65px;height:65px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21.7 14.4L20.7 15.4L18.6 13.3L19.6 12.3C19.8 12.1 20.2 12.1 20.4 12.3L21.7 13.6C21.9 13.8 21.9 14.1 21.7 14.4M12 19.9L18.1 13.8L20.2 15.9L14.1 22H12V19.9M10 19.1L21 8.1V5L12 1L3 5V11C3 15.8 5.9 20.3 10 22.3V19.1Z" />
        </svg><br>
        Inscription</div>
    <form @submit.prevent="register">
      <label for="password" class="form-label"></label>
      <div>
        <input
          type="text"
          placeholder="Nom"
          v-model="registerData.name"
          class="form-control"
          id="name"
        />
        <input
          type="email"
          placeholder="Adresse email"
          class="fields form-control"
          id="email"
          v-model="registerData.email"
          aria-describedby="emailHelp"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          v-model="registerData.password"
          class="form-control"
          id="password"
        />
      </div>
      <button type="submit" class="btn w-100 registerButton mt-3">Valider</button>
    </form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        const user = await this.$axios.$post("/api/auth/signin", {
          name: this.registerData.name,
          email: this.registerData.email,
          password: this.registerData.password,
        });
      } catch (err) {
        this.$toast.error(err);
      }
      this.$router.push("/auth/login");
    },
  },
};
</script>

<style scoped>
.loginForm{
  width: 600px;
  padding: 30px;
  background-color: #ffffff20;
  border-radius: 14px;
  margin-top: 20px;
}
.loginTitle{
  color: #ffffff79;
  font-family: 'Ubuntu', sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 50px;
}
.registerButton{
  color: #fff;
  background-color: #A52199;
  font-family: 'Lato', sans-serif;
  margin-top: 10px;
  font-weight: 500;
  font-size: 17px;
}
.fields{
  margin: 10px 0;
}
#name {
  color:#A52199;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  font-size: 17px;
}
#email {
  color:#A52199;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  font-size: 17px;
}
#password {
  color:#A52199;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  font-size: 17px;
}
</style>
