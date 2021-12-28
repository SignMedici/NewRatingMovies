<template>
  <v-container class="grey lighten-5 mainLogo" id="logo">
    <img :src="logoURL" alt="Rating Movies Logo" />
  </v-container>
</template>

<script>
export default {
  data(){
    return {
      logoURL: "@/assets/ratingMoviesLogo.png"
    }
  }
}
</script>

<style>
#logo{
    display:block;
    margin: 30px 0;
    padding: 0;
    text-align: center;
}
</style>
