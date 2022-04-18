<template>
  <div id="home">
    <UIBigLogo />
    <MovieRateCards
      :movies="movies"
      :nbItems="nbItems"
      :perPage="perPage"
      @changeHomeContent="changeContent"
    />
    <UIBtnTop :showAt="300" />
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      perPage: 8,
    };
  },
  computed: {
    ...mapState("moviesStore", ["movies", "nbItems"]),
  },
  async beforeMount() {
    console.log("screen:", this.$screen);
    this.$screen.width >= 1024 ? (this.perPage = 8) : (this.perPage = 5);
    await this.$store.dispatch("moviesStore/getMovies", [
      0,
      this.perPage,
      "min",
    ]);
  },
  methods: {
    async changeContent(page) {
      await this.$store.dispatch("moviesStore/getMovies", [
        page - 1,
        this.perPage,
        "min",
      ]);
      document.getElementById("logo").scrollIntoView();
    },
  },
};
</script>
