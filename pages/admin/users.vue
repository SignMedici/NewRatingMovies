<template>
  <div v-if="isAdmin === true">
    <Admin-UserAdmin />
  </div>
</template>


<script>
export default {
  computed:{
    isAdmin(){
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
};
</script>
