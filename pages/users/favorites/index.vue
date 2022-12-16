<template>
  <div v-if="isAuthenticated && showData">
    <UIBigLogo />
    <v-container class="grey lighten-5 square">
      <!-- Back button -->
      <UIBackBtn :backPath="'index'" />
      <!-- Page logo and title -->
      <div class="pageLogoTitle">
        <img class="favLogo" src="~/assets/favIcons/favorites.png" />
        <br />
        {{ $t("myFavorites") }}
      </div>
    </v-container>
    <!-- Movies cards -->
    <div class="my-5">
      <MovieRateCards
        :movies="results"
        :perPage="perPage"
        :nbItems="nbItems"
        @changeHomeContent="changeContent"
      />
    </div>
    <UIBtnTop :showAt="300" />
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      perPage: 8,
      page: 1,
      showData: false,
    };
  },
  computed: {
    ...mapState(["auth"]),
    ...mapState("moviesStore", ["results", "nbItems"]),
    isAuthenticated() {
      if (this.$store.getters.isAuthenticated) {
        return this.$store.getters.isAuthenticated; // check if there is an authenticated user
      } else {
        this.$router.push("/");
      }
    },
  },
  methods: {
    async changeContent(page) {
      await this.$store.dispatch("moviesStore/getUserFavorites", [
        this.auth.user.id,
        page,
        this.perPage,
      ]);
      document.getElementById("logo").scrollIntoView();
    },
  },
  async beforeMount() {
    this.$screen.width >= 1024 ? (this.perPage = 8) : (this.perPage = 5);
    const response = await this.$store.dispatch(
      "moviesStore/getUserFavorites",
      [this.auth.user.id, this.page, this.perPage]
    );
    this.showData = true;
  },
  beforeDestroy() {
    this.$store.dispatch("moviesStore/resetResults");
  },
};
</script>

<style scoped>
.favs {
  color: #fff;
}
.square {
  width: 600px;
  padding: 30px;
  background-color: #ffffff20;
  border-radius: 14px;
  margin-top: 32px;
}
.pageLogoTitle {
  color: #ffffff79;
  font-family: "Ubuntu", sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 50px;
}
.favLogo {
  height: 65px;
  width: auto;
}
.mobile {
  display: none;
}

@media (max-width: 620px) {
  .square {
    width: 92%;
  }
  .pageLogoTitle {
    font-size: calc(
      24px + (50 - 24) * ((100vw - 300px) / (620 - 300))
    ); /* font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
    white-space: nowrap;
  }
}
</style>
