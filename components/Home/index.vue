<template>
  <div id="home">
    <UIBigLogo />
    <MovieRateCards
      :movies="movies"
      :nbMovies="nbMovies"
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
      currentPage: 1,
    };
  },
  computed: {
    ...mapState("moviesStore", ["movies", "nbMovies"]),
  },
  async created() {
    await this.$store.dispatch("moviesStore/getMovies", [
      0,
      this.perPage,
      "min",
    ]);
  },
  methods: {
    async changeContent(page) {
      this.currentPage = page;
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
