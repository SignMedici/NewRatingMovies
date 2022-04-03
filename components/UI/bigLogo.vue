<template>
  <v-container class="grey lighten-5 mainLogo">
    <div id="logo">
      <nuxt-link
        class="me-2"
        :to="{
          name: `index___${siteLang}`,
          hash: '#biglogo',
        }"
      >
        <img
          id="bigLogo"
          :src="require(`~/assets/ratingMoviesLogo.png`)"
          alt="Rating Movies Logo"
        />
      </nuxt-link>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      siteLang: this.$i18n.locale,
    };
  },
};
</script>

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
