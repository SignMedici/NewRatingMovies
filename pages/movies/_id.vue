<template>
  <div id="moviePage">
    <UIBigLogo />
    <MovieOverviewDesktop v-if="showDesktop" />
    <MovieOverviewMobile v-if="showMobile" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      showDesktop: false,
      showMobile: false,
    };
  },
  mounted() {
    let screenSize = window.innerWidth;
    screenSize >= 1024 ? (this.showDesktop = true) : (this.showMobile = true);
  },
};
</script>
