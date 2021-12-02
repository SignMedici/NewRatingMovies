<template>
  <div v-if="roleIsAdmin === true">
    <UIBigLogo />
    <v-container class="grey lighten-5 loginForm">
      <!-- Back button -->
      <UIBackBtn :path="'admin'" />
      <!-- Page logo and title -->
      <div class="pageLogoTitle">
        <svg style="width:65px;height:65px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
        </svg><br>
        Modifier un utilisateur</div>
        <!-- Form -->
        <form @submit.prevent="updateUser">
            <div class="mt-3">
              <label for="name" class="form-label">Nom</label>
              <input type="text" class="form-control" id="name1" aria-describedby="name1" v-model="name">
            </div>
            <div class="my-2">
              <label for="exampleInputEmail1" class="form-label">Adresse Email</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
            </div>
            <div>
              <label for="exampleInputPassword1" class="form-label">Admin?</label>
              <input type="text" class="form-control" id="exampleInputPassword1" v-model="isAdmin">
            </div>
            <button type="submit" class="btn btn-primary confirmButton mt-5">Valider</button>
        </form>
    </v-container>
  </div>
</template>

<script>
export default {

    data() {
      return {
        errors: [],
        user: [],
        name: "",
        email: "",
        isAdmin: "",
        baseURL: process.env.baseURL,
      }
    },
    created(){
        let userUpdate = this.$store.getters.getUserById(this.$route.params.userId);

        if(userUpdate){
          this.name = userUpdate.name;
          this.email = userUpdate.email;
          this.isAdmin = userUpdate.isAdmin;
        }
        else{
          this.$router.push("/admin");
        }
    },
    methods: {
      updateUser(){
        this.$axios
        .patch(this.baseURL + "/user/update/"+ this.$route.params.userId, {
          name: this.name,
          email: this.email,
          isAdmin: this.isAdmin,
        })
        .then(async (response) => {
          this.$store.commit('UPDATE_USER', response.data);
          this.$router.push('/admin/users');
        });
      },
    },
    computed: {
      roleIsAdmin(){
        let user = this.$store.getters.getUserInfo;
        if(user){
          if(user.isAdmin)
            return this.$store.getters.getUserInfo.isAdmin;
          else{
            this.$router.push("/");
          }
        }
        else{
          this.$router.push("/");
        }
      }
    }
}
</script>

<style scoped>
.backBtn{
  padding: 0;
  color: #A52199;
}
.loginForm{
  width: 600px;
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
.confirmButton{
  color: #fff;
  background-color: #A52199;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  font-size: 17px;
  width:100%;
}
label{
  color: white;
}
</style>
