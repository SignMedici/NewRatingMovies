<template>
  <div v-if="roleIsAdmin && showData">
    <UIBigLogo />
    <v-container class="grey lighten-5 square" ref="updateForm">
      <!-- Back button -->
      <UIBackBtn :backPath="'admin'" />
      <!-- Page logo and title -->
      <div class="pageLogoTitle">
        <svg style="width: 65px; height: 65px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z"
          /></svg
        ><br />
        {{ $t("modifyMovie") }}
      </div>
      <!-- Form -->
      <form method="post" @submit.prevent="updateMovie()">
        <!-- Title -->
        <div>
          <label>{{ $t("title") }}</label>
          <input
            type="text"
            class="form-control"
            v-model="currentMovie[siteLang].title"
          />
        </div>
        <!-- Release date -->
        <div class="my-3">
          <label
            >{{ $t("releaseDate") }} <small>(Format: YYYY-MM-DD)</small></label
          >
          <input
            type="text"
            class="form-control"
            v-model="currentMovie.release_date"
          />
        </div>
        <!-- Genre -->
        <div>
          <label>Genre</label>
          <UIGenreSelector
            :movieGenre="currentMovie.genre"
            :allGenres="movieGenres"
            :newGenre.sync="genre"
          />
        </div>
        <!-- Vote -->
        <div class="my-3">
          <label>{{ $t("vote") }}</label>
          <input
            type="number"
            class="form-control"
            v-model="currentMovie.vote_average"
            step="0.1"
            min="0"
            max="10"
          />
        </div>
        <!-- Director -->
        <div>
          <label>{{ $t("director") }}</label>
          <input
            type="text"
            class="form-control"
            v-model="currentMovie.director"
          />
        </div>
        <!-- Overview -->
        <div class="mt-3">
          <label>{{ $t("overview") }}</label>
          <textarea
            class="overview form-control"
            v-model="currentMovie[siteLang].overview"
            rows="6"
          />
        </div>
        <!-- Submit button -->
        <button type="submit" class="btn confirmButton mt-5">
          {{ $t("modify") }}
        </button>
      </form>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "",
      vote_average: "",
      release_date: "",
      genre: [],
      newGenre: [],
      poster_path: "",
      overview: "",
      director: "",
      rules: [(value) => !!value || "Required."],
      movie: [],
      baseURL: process.env.baseURL,
      siteLang: this.$i18n.locale,
      movieGenres: process.env.MOVIE_GENRES,
      showData: false,
    };
  },
  methods: {
    async updateMovie() {
      let updatedFilm = {
        vote_average: this.vote_average,
        release_date: this.release_date,
        director: this.director,
        genre: this.genre,
        [this.siteLang]: {
          title: this.title,
          overview: this.overview,
          poster_path: this.poster_path,
        },
      };

      await this.$store.dispatch("moviesStore/updateMovie", {
        id: this.$route.params.id,
        newInfo: updatedFilm,
      });

      this.$toast.success(this.$t("updateDone"));
      this.$router.push("/admin");
    },
  },
  computed: {
    ...mapState("moviesStore", ["currentMovie"]),
    roleIsAdmin() {
      if (this.$store.getters.roleIsAdmin === true) {
        return true;
      } else {
        this.$router.push("/");
      }
    },
  },
  async created() {
    let request = await this.$store.dispatch(
      "moviesStore/getMovieById",
      this.$route.params.id
    );

    this.showData = true;
  },
};
</script>
<style scoped>
.backBtn {
  padding: 0;
  color: var(--color-rose);
}
.square {
  width: 700px;
  padding: 30px;
  background-color: #ffffff20;
  border-radius: 14px;
  margin-top: 20px;
}
.pageLogoTitle {
  color: #ffffff79;
  font-family: "Ubuntu", sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: calc(40px + (60 - 40) * ((100vw - 1024px) / (4096 - 1024)));
  white-space: nowrap;
  margin-bottom: 30px;
}
.form {
  display: block;
  margin-top: 20px;
}
.genreSelector {
  width: 100%;
  background-color: #fff;
  border: 0;
  border-radius: 10px;
  padding: 5px;
  overflow: auto;
}
.confirmButton {
  color: #fff;
  background-color: var(--color-rose);
  font-family: "Lato", sans-serif;
  margin-top: 10px;
  font-weight: 500;
  font-size: 17px;
  width: 100%;
}
label {
  color: white;
}
.overview {
  overflow: auto;
  text-align: justify;
  padding: 0 10px 0 0;
}
.overview::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
}

.overview::-webkit-scrollbar {
  width: 8px;
}

.overview::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--color-fushia);
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
