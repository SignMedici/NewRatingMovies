<template>
  <div ref="moviesContainer">
      <UILoading v-if="showHideSpinner" />
      <div v-else>
        <div v-if="movies.length > 0">
          <v-container class="grey lighten-5">
            <v-row no-gutters>
              <v-col v-for="movie in movies" :key="movie.id" cols="12" md="3">
                <v-card class="card">
                  <nuxt-link
                    class="d-flex nav-link active"
                    aria-current="page"
                    :to="
                      localePath({
                        name: 'movies-id',
                        params: { id: movie.id },
                        hash: '#logo',
                      })
                    "
                  >
                    <img :srcset="url + movie[language].poster_path" />
                  </nuxt-link>
                  <UIFavoriteIcon
                    v-if="isAuthenticated"
                    :movieDbId="movie.movie_db_id"
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
                      :movieDbId="movie.movie_db_id"
                      v-if="isAuthenticated"
                    />
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <UIPaginator
            :perPage="perPage"
            :totalItems="nbItems"
            @changePage="changePageContent"
          />
        </div>
        <div v-else class="noMovieInDB">
          <img src="~/assets/No-Movie.png" alt="no-movie.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: ["movies", "perPage", "nbItems"],
  data() {
    return {
      showHideSpinner: true,
      language: this.$i18n.locale,
      title: "",
      url: process.env.apiPicURL,
      emptyIcon: "mdi-heart-outline",
      fullIcon: "mdi-heart",
      sortBy: "title",
      sortDirection: "asc",
      myRates: [],
    };
  },
  computed: {
    ...mapState(["auth"]),
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
    },
  },
  beforeCreate() {
    this.showHideSpinner = true;
  },
  mounted() {
    this.showHideSpinner = false;
  },
  async created() {
    this.$nextTick(async () => {
      if (this.auth.user) {
        this.myRates = await this.auth.user.my_rates;
      }
    });
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
};
</script>
<style scoped>
.v-card {
  display: flex;
  margin: 10px;
  border: 0px;
  border-radius: 10px;
  overflow: hidden;
  max-width: 300px;
}
.v-card img {
  object-fit: cover;
  width: 100%;
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
.nav-link {
  padding: 0;
}
.noMovieInDB {
  text-align: center;
}
</style>
