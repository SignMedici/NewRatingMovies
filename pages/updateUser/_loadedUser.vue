<template>
  <div>
    <v-container class="grey lighten-5 mainLogo" id="logo">
      <img src="../../assets/logo_big.png">
    </v-container>
    <v-container class="grey lighten-5 loginForm">
      <!-- Back button -->
      <nuxt-link :to="{ name: 'profile',hash:'#logo'}" class="btn backBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg>
      </nuxt-link>
      <!-- Page logo and title -->
      <div class="pageLogoTitle">
        <svg style="width:65px;height:65px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z" />
        </svg><br>
        Modifier mon profile
      </div>
      <!-- Form -->
      <v-container data-app>
        <form @submit.prevent="updateUserLoaded">
            <div class="mb-3">
              <label for="name" class="form-label">Nom</label>
              <input type="text" class="form-control" id="name1" aria-describedby="name1" v-model="name">
            </div>
            <div>
              <label for="exampleInputEmail1" class="form-label">Adresse Email</label>
            </div>
            <div class="mb-3" :class="['input-group', isEmailValid()]">
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Admin?</label>
              <input type="text" class="form-control" id="exampleInputPassword1" v-model="isAdmin">
            </div>
            <button type="submit" class="btn confirmButton">Valider</button>
        </form>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {

    data() {
      return {
        baseURL: process.env.baseURL,
        name: "",
        email: "",
        isAdmin: "",
        msg: "",
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      }
    },
    created(){
        this.$route.params.userId;
        let userLoadedUpdate = this.$store.getters.getUserInfo;
        this.name = userLoadedUpdate.name;
        this.email = userLoadedUpdate.email;
        this.isAdmin = userLoadedUpdate.isAdmin;
        // this.name = userLoadedUpdate.name;
    },
    computed: {
        getUserInfo() {
            return this.$store.getters.getUserInfo;
        },
    },
    methods: {
        isEmailValid: function() {
             return (this.email == "")? "" : (this.reg.test(this.email)) ? 'has-success' : 'has-error';
        },
        updateUserLoaded(){
            this.$axios
                .patch(this.baseURL + "/user/update/" + this.$route.params.userId, {
                    name: this.name,
                    email: this.email,
                    isAdmin: this.isAdmin,
                })
                .then(async (response) => {
                this.$store.commit('UPDATE_USER', response.data);
                    this.$router.push('/profile');
                });
        }
    }
};
</script>

<style scoped>
.mainLogo{
    margin: 10px 0 25px 0;
    padding: 0;
    text-align: center;
}
.backBtn{
  padding: 0;
  color: white;
}
.loginForm{
  width: 700px;
  padding: 30px;
  background-color: #ffffff20;
  border-radius: 14px;
  margin-top: 20px;
}
.pageLogoTitle{
  color: #ffffff79;
  font-family: 'Ubuntu', sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 50px;
}
.form{
  display:flex;
  margin-top: 20px;
}
.confirmButton{
  color: #fff;
  background-color: #A52199;
  font-family: 'Lato', sans-serif;
  margin-top: 10px;
  font-weight: 500;
  font-size: 17px;
  width: 100%
}
label{
  color:white;
}
</style>
