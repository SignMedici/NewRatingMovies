<template lang="">
  <div>
    <v-rating
    v-model="favStatus"
      class="favoriteMovie"
      hover
      length="1"
      size="35"
      background-color="purple lighten-1"
      color="purple"
    ></v-rating>
  </div>
</template>
<script>
export default {
  props:["myFavorites","movieDbId"],
  data(){
    return {
      favStatus: 0,
      baseURL: process.env.baseURL,
    }
  },
  methods:{
    toggleFavorite(){
      //Add and remove favorite

    }
  },
  created(){
    if(this.myFavorites.length > 0){

      for(let i = 0; i < this.myFavorites.length; i++){
        if (this.myFavorites[i] === this.movieDbId){
          this.favStatus = 1;
          break
        }
      }
    }
  }
}
</script>
<style scoped>
  .favoriteMovie {
  font-size: 64px;
  position: absolute;
  top: -20px;
  right: 5px;
}
</style>
