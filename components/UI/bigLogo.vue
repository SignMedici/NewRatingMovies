<template>
  <div id="logo" class="grey lighten-5 mainLogo">
    <nuxt-link
      class="me-2"
      :to="
        localePath({
          name: 'index',
          hash: '#logo',
        })
      "
    >
      <img
        :src="require(`~/assets/ratingMoviesLogo.png`)"
        alt="Rating Movies Logo"
      />
    </nuxt-link>
  </div>
</template>
<style scoped>
#logo {
  display: block;
  margin: 30px 0;
  padding: 0;
  text-align: center;
}

#logo img {
  width: auto;
  max-height: 150px;
}

@media (max-width: 1024px) {
  #logo img {
    max-height: 100px;
    width: auto;
  }
}
</style>
