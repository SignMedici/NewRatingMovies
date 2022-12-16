<template>
  <div id="home" v-if="showData">
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
      showData: false,
    };
  },
  computed: {
    ...mapState("moviesStore", ["movies", "nbItems"]),
  },
  async mounted() {
    // var t0 = performance.now();
    this.$screen.width >= 1024 ? (this.perPage = 8) : (this.perPage = 5);
    // var t1 = performance.now();
    // console.log("To know width took " + (t1 - t0) + " milliseconds.");
    // var t0 = performance.now();
    await this.$store.dispatch("moviesStore/getMovies", {
      page: 1,
      size: this.perPage
    });
    // var t1 = performance.now();
    // console.log("To populate store took " + (t1 - t0) + " milliseconds.");
    this.showData = true;
  },
  methods: {
    async changeContent(page) {
      await this.$store.dispatch("moviesStore/getMovies", {
        page: page,
        size: this.perPage
      });
      document.getElementById("logo").scrollIntoView();
    },
  },
};
</script>
