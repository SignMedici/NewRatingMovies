<template>
  <div class="moviePage">
    <UIBigLogo />
    <MovieOverviewDesktop class="desktop" :siteLang="siteLang" />
    <MovieOverviewMobile class="mobile" :siteLang="siteLang" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      siteLang: this.$i18n.locale,
      movie: "",
    };
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
