<template>
  <div class="moviePage">
    <UIBigLogo />
    <MovieOverviewDesktop class="desktop" />
    <MovieOverviewMobile class="mobile" />
  </div>
</template>
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
