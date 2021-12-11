<template>
  <div id="movieHome">
    <v-container class="grey lighten-5 mainContainer">
      <v-row no-gutters>
        <v-col v-for="movie in movies" :key="movie._id" cols="12" sm="3">
          <div class="card">
            <v-card>
              <div class="hover10">
                <figure>
                  <img
                    @click="toggleModal(movie)"
                    class="imgMovieCard"
                    :srcset="url + movie[siteLang].poster_path"
                  />
                  <div v-if="isAuthenticated">
                    <UIFavorite :myFavorites="myFavorites" :movieDbId="movie.movieDbId"/>
                  </div>
                </figure>
              </div>
              <div class="cardInfos">
                <v-card-title v-if="movie[siteLang].title.length > 22"
                  >{{ movie[siteLang].title.substring(0, 22) }}...</v-card-title
                >
                <v-card-title v-else>{{ movie[siteLang].title }}</v-card-title>
                <div v-if="isAuthenticated" class="text-subtitle-1">
                  {{ movie.release_date.substring(0, 4) }}
                </div>
                <div v-else class="text-subtitle-1 mb-2">
                  {{ movie.release_date.substring(0, 4) }}
                </div>
                <div v-if="isAuthenticated">
                  <UIRatingStars :myRates="myRates" :movieDbId="movie.movieDbId" />
                </div>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <MovieModal
      :revele="revele"
      :toggleModal="toggleModal"
      :movie="movieForModal"
      :siteLang="siteLang"
    />
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      url: process.env.API_PIC_URL,
      movies: [],
      emptyIcon: "mdi-heart-outline",
      fullIcon: "mdi-heart",
      sortBy: "title",
      sortDirection: "asc",
      siteLang: '',
      movieForModal: "",
      revele: false,
      myRates: [],
      myFavorites: []
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
    },
  },
  methods: {
    toggleModal(movie) {
      this.revele = !this.revele;
      this.movieForModal = movie;
    },
  },
  created() {
    this.movies = this.$store.getters.getMovies;

    if(this.$store.getters.getUserInfo){
      this.myRates = this.$store.getters.getUserInfo.myRates;
    }

    if(this.$store.getters.getUserInfo){
      console.log(this.$store.getters.getUserInfo.myFavorites);
      this.myFavorites = this.$store.getters.getUserInfo.myFavorites;
    }

    if(this.$cookiz.get('siteLang')){
      this.siteLang = this.$cookiz.get('siteLang')
    }
    else{
      this.siteLang = 'fr'
    }
    this.$i18n.setLocale(this.siteLang);
  },
};
</script>
<style scoped>
.card {
  display: flex;
  margin: 5px;
  border: 0px;
  border-radius: 10px;
  overflow: hidden;
}
.imgMovieCard {
  object-fit: cover;
  min-height: 450px;
  width: 100%;
  height: auto;
}
.v-card__text {
  max-height: 200px;
  font-family: "Lato", sans-serif;
  font-size: 18px;
}
.v-card__title {
  padding: 10px 10px 0 10px;
  color: #9042b4;
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
}
.text-subtitle-1 {
  padding: 0 0 0 10px;
  font-family: "Lato", sans-serif;
  font-weight: 600;
  color: #9042b4;
  font-size: 17px;
}
.cardInfos {
  background-color: #d29eeb31;
}
.v-card__actions {
  padding: 0;
}
.v-rating {
  padding-bottom: 5px;
}
.v-icon {

}
figure {
  margin: 0;
}
.v-icon.v-icon.v-icon--link {
  cursor: pointer;
  outline: none;
}
/* Blur + Gray Scale */
.hover10 figure img {
  -webkit-filter: sepia(0);
  filter: sepia(0);
  -webkit-transition: 0.6s ease-in-out;
  transition: 0.6s ease-in-out;
  cursor: pointer;
}
.hover10 figure:hover img {
  -webkit-filter: sepia(100%);
  filter: sepia(100%);
}
</style>
