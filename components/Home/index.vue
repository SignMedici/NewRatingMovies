<template>
  <div id="homeComp">
    <UIBigLogo />
    <MovieRateCard :movies="getMovies"/>
    <UIBtnTop :showAt="500" />
  </div>
</template>
<script>
export default {
  computed: {
    getMovies(){
      return this.$store.getters.getMovies;
    }
  },

}
</script>

