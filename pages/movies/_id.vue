<template>
  <div class="moviePage">
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
<style scoped>
.desktop {
  display: block;
}
.mobile {
  display: none;
}

.movieData {
  color: white;
}

@media (max-width: 1024px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }
}
</style>
