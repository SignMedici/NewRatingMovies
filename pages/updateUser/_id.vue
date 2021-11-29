<template>
<div> 
    <v-container class="grey lighten-5 mainLogo">
      <img src="../../assets/logo_big.png">
    </v-container>
    <v-container class="grey lighten-5 loginForm">
      <div class="loginTitle">
        <svg style="width:65px;height:65px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
        </svg><br>
        Update user</div>
        <form @submit.prevent="updateUser">
            <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name1" aria-describedby="name1" v-model="name">
            </div>
            <div class="mb-3"> 
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
            </div>
            <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">IsAdmin</label>
            <input type="text" class="form-control" id="exampleInputPassword1" v-model="isAdmin">
            </div>
            <div class="mb-3 form-check">
            </div>
            <button type="submit" class="btn btn-primary">Update User</button>
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
      }
    },
    // computed: {
    //   getterUserId(){
    //     this.$store.getters.getterUserId;
    //   }
      
    // },
    
    created(){
        let userUpdate = this.$store.getters.getUserById(this.$route.params.userId);
        this.name = userUpdate.name;
        this.email = userUpdate.email;
        this.isAdmin = userUpdate.isAdmin;

    },
    methods: {
      updateUser(){
      //   if (!this.email) {
      //   this.errors.push('Email required.');
      // } else if (!this.validEmail(this.email)) {
      //   this.errors.push('Valid email required.');
      // }
      //  if (!this.errors.length) {
      //   return true;
      // }

      // e.preventDefault();
        //     let userUp= {
        //     name: this.name, 
        //     email: this.email,
        //     isAdmin: this.isAdmin,
        //     };
        //     this.__submitToServer(userUp);
        //     },
        //     __submitToServer(data) {
        //         console.log(data);
        //         this.$store.dispatch('updateUser', this.$route.params.userId, data);
        //         this.$router.push('/admin/users');
        // }
        this.$axios
            .patch("http://localhost:8010/api/user/update/" + this.$route.params.userId, { 
                name: this.name, 
                email: this.email,
                isAdmin: this.isAdmin,
            })
            .then(async (response) => {
            this.$store.commit('UPDATE_USER', response.data);
                this.$router.push('/admin/users');
            });
        },
        
    //   validEmail: function (email) {
    //   var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   return re.test(email);
    // }
      
    }
};
</script>

<style scoped>


</style>
