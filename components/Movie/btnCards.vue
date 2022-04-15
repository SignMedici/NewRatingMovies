<template>
  <div id="movieResults">
    <v-container class="cardContainer d-flex grey lighten-5">
      <v-row no-gutters>
        <v-col v-for="movie in movies" :key="movie.id" cols="12" sm="3">
          <div>
            <div class="card">
              <v-card>
                <figure>
                  <!-- Poster -->
                  <button @click="getInfo(null, null, movie)">
                    <img
                      v-if="movie[siteLang].poster_path"
                      :srcset="url + movie[siteLang].poster_path"
                      class="imgMovieCard hover10"
                    />
                    <img
                      v-else
                      class="defaultPic hover10"
                      src="~/assets/no_picture.png"
                      alt="default picture"
                    />
                  </button>
                </figure>
                <div class="cardInfos">
                  <!-- Title -->
                  <v-card-title v-if="movie[siteLang].title.length > 22"
                    >{{
                      movie[siteLang].title.substring(0, 22)
                    }}...</v-card-title
                  >
                  <v-card-title v-else>{{
                    movie[siteLang].title
                  }}</v-card-title>
                  <!-- Year -->
                  <div
                    v-if="movie.release_date"
                    class="text-subtitle-1 ms-1 mb-2"
                  >
                    {{ movie.release_date.substring(0, 4) }}
                  </div>
                  <div v-else class="mb-2"><br /></div>
                  <!-- Button -->
                  <v-card-actions>
                    <button
                      v-if="btnTxt === 'add'"
                      type="submit"
                      @click="checkIsInDB(filePath, fileToModify, movie)"
                      class="btn w-50 confirmButton"
                    >
                      {{ $t("add") }}
                    </button>
                    <button
                      v-else-if="btnTxt === 'select'"
                      type="submit"
                      @click="getInfo(filePath, fileToModify, movie)"
                      class="btn w-50 confirmButton"
                    >
                      {{ $t("choose") }}
                    </button>
                  </v-card-actions>
                </div>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["btnTxt", "fileToModify", "filePath", "movies"],
  data() {
    return {
      movieDbId: 0,
      selectedMovie: "",
      title: "",
      genre: [],
      grade: 0,
      date: "",
      poster: "",
      director: "",
      overview: "",
      strGenre: "",
      url: process.env.apiPicURL,
      baseURL: process.env.baseURL,
      siteLang: this.$i18n.locale,
    };
  },
  methods: {
    async checkIsInDB(filePath, fileToModify, movie) {
      let inDb = await this.$store.dispatch("moviesStore/idInDb", movie.id);
      if (typeof inDb == "undefined") {
        this.getInfo(filePath, fileToModify, movie);
      } else {
      }
    },
    async getInfo(filePath, fileToModify, movie) {
      const response = await axios
        .post(this.baseURL + "/the-movie-db/" + movie.id + "/getInfo")
        .then(async (response) => {
          this.selectedMovie = await response.data;
          if (filePath === null) {
            this.toggleModal(this.selectedMovie);
          } else if (this.btnTxt === "add") {
            this.addMovie();
          } else if (this.btnTxt === "select") {
            this.selectedMovie.poster = this.url + this.selectedMovie.poster;
            this.modifyMetaData(filePath, fileToModify);
          }
        });
    },

    modifyMetaData(filePath, fileToModify) {
      let info = this.selectedMovie;
      if (
        confirm(
          `${this.$t("useInfoOK")}\n   ` +
            info[this.siteLang].title +
            " - " +
            info.release_date.substring(0, 4) +
            `\n${this.$t("for")}\n   ` +
            fileToModify.name
        )
      ) {
        //if the path doesn't end by a slash, add it
        if (filePath.slice(-1) !== "/") {
          filePath += "/";
        }

        axios
          .post(this.baseURL + "/movies/" + info.movieDbId + "/metadata", {
            format: fileToModify.type,
            path: filePath + fileToModify.name,
            selectedMovie: info,
          })
          .then((response) => {
            this.$router.go(0);
          });
      }
    },

    async addMovie() {
      await this.$store.dispatch("moviesStore/addMovie", this.selectedMovie);
      this.$toast.success(this.$t("addDone"));
    },
  },
};
</script>
<style scoped>
.cardContainer {
  position: relative;
  padding: 5px;
}
.card {
  border: 0px;
  border-radius: 10px;
  overflow: hidden;
  min-width: 270px;
  max-width: 315px;
  width: 100%;
}
.imgMovieCard {
  object-fit: cover;
  width: 100%;
  height: auto;
  max-width: 315px;
}
.defaultPic {
  object-fit: cover;
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
  color: var(--color-fushia);
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
}
.text-subtitle-1 {
  padding: 0 0 0 6px;
  font-family: "Lato", sans-serif;
  font-weight: 600;
  color: var(--color-fushia);
  font-size: 17px;
}
.v-card__actions {
  padding: 0;
}
.v-card__actions button {
  margin: 0 auto 10px auto;
  color: #fff;
  background-color: var(--color-fushia);
  font-family: "Lato", sans-serif;
  font-weight: 500;
  font-size: 17px;
}
.cardInfos {
  background-color: #d29eeb31;
}
figure {
  margin: 0;
}
.favoriteMovie {
  font-size: 64px;
  position: absolute;
  top: -15px;
  right: 5px;
  color: #ffffff;
}

/* Blur + Gray Scale */
.hover10 figure img {
  -webkit-filter: sepia(0);
  filter: sepia(0);
  -webkit-transition: 0.6s ease-in-out;
  transition: 0.6s ease-in-out;
}
.hover10 figure:hover img {
  -webkit-filter: sepia(100%);
  filter: sepia(100%);
}

@media (min-width: 1251px) {
  .imgMovieCard {
    min-height: 412px;
  }
}
</style>
