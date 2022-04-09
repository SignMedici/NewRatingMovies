<template>
  <div ref="moviesContainer">
    <div v-if="movies.length > 0">
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col v-for="movie in movies" :key="movie._id" cols="12" md="3">
            <nuxt-link
              class="nav-link active"
              aria-current="page"
              :to="
                localePath({
                  name: 'movies-id',
                  params: { id: movie._id },
                  hash: '#logo',
                })
              "
            >
              <v-card class="card">
                <img
                  class="imgMovieCard"
                  :srcset="url + movie[language].poster_path"
                />
                <UIFavoriteIcon
                  v-if="isAuthenticated"
                  :myFavorites="myFavorites"
                  :movieDbId="movie.movieDbId"
                />
                <div class="d-block">
                  <v-card-title>{{
                    titleHandler(movie[language].title)
                  }}</v-card-title>
                  <v-card-subtitle>
                    {{ movie.release_date.substring(0, 4) }}
                  </v-card-subtitle>
                  <UIRatingStars
                    :myRates="myRates"
                    :movieDbId="movie.movieDbId"
                    v-if="isAuthenticated"
                  />
                </div>
              </v-card>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
      <UIPaginator
        :perPage="perPage"
        :totalItems="nbMovies"
        @changePage="changePageContent"
      />
    </div>
    <div v-else class="noMovieInDB">
      <img src="~/assets/No-Movie.png" alt="no-movie.png" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["movies", "nbMovies", "perPage"],
  data() {
    return {
      language: this.$i18n.locale,
      title: "",
      url: process.env.apiPicURL,
      emptyIcon: "mdi-heart-outline",
      fullIcon: "mdi-heart",
      sortBy: "title",
      sortDirection: "asc",
      myRates: [],
      myFavorites: [],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
    },
  },
  methods: {
    changePageContent(page) {
      this.$emit("changeHomeContent", page);
    },
    titleHandler(title) {
      let titleToDisplay = "";
      if (title.length > 20) {
        let words = title.split(" ");

        for (let word of words) {
          if (titleToDisplay === "") {
            if (word.length <= 20) {
              titleToDisplay += word;
            } else {
              titleToDisplay += word.slice(0, 16) + " ...";
            }
          } else if (titleToDisplay.length + word.length + 1 <= 20) {
            titleToDisplay += " " + word;
          } else {
            titleToDisplay += " ...";
            break;
          }
        }
      } else {
        titleToDisplay = title;
      }

      return titleToDisplay;
    },
  },
  async mounted() {
    this.$nextTick(async () => {
      let elem = this.$refs.moviesContainer;
      if (typeof elem != "undefined") {
        let totalWidth = elem.getBoundingClientRect().width;
        if (totalWidth <= 1024) {
          this.perPage = 5;
        }
      }
      if (this.$store.getters.getUserInfo) {
        this.myRates = this.$store.getters.getUserInfo.myRates;
      }

      if (this.$store.getters.getUserInfo) {
        this.myFavorites = this.$store.getters.getUserInfo.myFavorites;
      }
    });
  },
};
</script>
<style scoped>
.v-card {
  display: flex;
  margin: 5px;
  border: 0px;
  border-radius: 10px;
  overflow: hidden;
  max-width: 300px;
}
.v-card img {
  object-fit: cover;
  max-width: 300px;
  margin: 0;
  padding: 0;
  -webkit-filter: sepia(0);
  filter: sepia(0);
  -webkit-transition: 0.6s ease-in-out;
  transition: 0.6s ease-in-out;
}
.v-card img:hover {
  -webkit-filter: sepia(100%);
  filter: sepia(100%);
}
.v-card__title {
  padding: 5px 5px 0 10px;
  color: var(--color-fushia);
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
}
.v-card__subtitle {
  margin-top: 0;
  padding: 0 0 5px 10px;
  font-family: "Lato", sans-serif;
  font-weight: 600;
  color: var(--color-fushia);
  font-size: 17px;
}
.v-icon.v-icon.v-icon--link {
  outline: none;
}
.noMovieInDB {
  text-align: center;
}
</style>
