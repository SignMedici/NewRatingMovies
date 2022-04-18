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
  beforeMount() {
    console.log("width:", this.$screen.width);
    if (this.$screen.width >= 1024) {
      this.showDesktop = true;
      this.showMobile = false;
    } else {
      this.showDesktop = false;
      this.showMobile = true;
    }
  },
};
</script>
