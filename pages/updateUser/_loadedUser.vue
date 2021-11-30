<template>
<div>
        <form @submit.prevent="updateUserLoaded">
            <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name1" aria-describedby="name1" v-model="name">
            </div>
            <div class="mb-3" :class="['input-group', isEmailValid()]">
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


</style>
