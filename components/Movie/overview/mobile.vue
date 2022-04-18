<template>
  <div class="movie" v-if="showData">
    <div class="movieContent">
      <div class="poster">
        <figure>
          <!-- Poster -->
          <img
            v-if="currentMovie[siteLang].poster_path"
            :srcset="url + currentMovie[siteLang].poster_path"
          />
          <div v-else class="defaultPicContainer">
            <img
              class="defaultPic"
              src="~/assets/no_picture.png"
              alt="default picture"
            />
          </div>
        </figure>
      </div>
      <div class="d-block mt-4">
        <div>
          <!-- Title -->
          <span
            v-if="currentMovie[siteLang].title.length <= 33"
            class="bigTitle"
            >{{ currentMovie[siteLang].title }}</span
          >
          <span v-else class="smallTitle">{{
            currentMovie[siteLang].title
          }}</span>
        </div>
        <!-- Movie details -->
        <div class="movieData">
          <!-- Year -->
          <div v-if="currentMovie.release_date" class="year mt-2">
            {{ currentMovie.release_date.substring(0, 4) }}
            <!-- Vote -->
            <span v-if="currentMovie.vote_average" class="vote">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-heart-fill voteIcon"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
              {{ currentMovie.vote_average }}
            </span>
          </div>
          <!-- Genres -->
          <span
            class="genre"
            v-if="currentMovie.genre"
            v-for="movieGenre in currentMovie.genre"
            >{{ $t(movieGenre) }}</span
          >

          <!-- People -->
          <div class="people">
            <!-- Director -->
            <div v-show="currentMovie.director">
              <span>{{ $t("director") }}</span
              ><br />
              <div class="casting">{{ currentMovie.director }}</div>
            </div>
            <!-- Actors -->
            <div v-if="currentMovie.casting">
              <span>{{ $t("casting") }}</span
              ><br />
              <div class="casting">{{ currentMovie.casting }}</div>
            </div>
          </div>
          <!-- Overview -->
          <div v-if="currentMovie[siteLang].overview" class="overview">
            {{ currentMovie[siteLang].overview }}
          </div>
        </div>
      </div>
    </div>
    <MovieTrailers :trailers="currentMovie[siteLang].trailers" />
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "MovieDescription",
  data() {
    return {
      url: process.env.apiPicURL,
      noPic: "~/assets/no_picture.png",
      baseVideoURL: process.env.VIDEO_URL,
      movie: "",
      siteLang: this.$i18n.locale,
      perPage: 6,
      currentPage: 1,
      fromIndex: 0,
      toIndex: 6,
      showData: false,
    };
  },
  computed: {
    ...mapState("moviesStore", ["currentMovie"]),
  },
  methods: {
    async changePageContent(page) {
      this.currentPage = page;
      this.fromIndex = this.perPage * page - this.perPage;
      this.toIndex = this.perPage * page;
      // window.scrollTo({ top: 400 });
    },
  },
  async created() {
    const response = await this.$store.dispatch(
      "moviesStore/getMovieById",
      this.$route.params.id
    );
    this.showData = true;
  },
  beforeDestroy() {
    this.showData = false;
    this.$store.dispatch("moviesStore/resetCurrentMovie");
  },
};
</script>
<style scoped>
.poster {
  border: 0;
}
.genre {
  color: #fff;
}
.genre + .genre::before {
  content: ", ";
}
img {
  max-width: 350px;
  width: 100%;
  height: auto;
  border: 0;
  border-radius: 10px;
  background-color: whitesmoke;
  margin: 0 auto;
  display: flex;
}
.defaultPicContainer {
  display: flex;
  margin: auto;
  background-color: whitesmoke;
  border: 0;
  border-radius: 10px;
}
.defaultPic {
  width: 100%;
  max-width: 300px;
  height: 450px;
  height: auto;
  text-align: center;
}
.trailerIcon {
  position: absolute;
}
.movie {
  display: block;
  border: 0;
  border-radius: 10px;
  overflow: auto;
}
.movieContent {
  display: block;
  background-color: var(--color-purple);
  padding: 20px;
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.bigTitle {
  color: var(--color-fushia);
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  font-size: 30px;
}
.smallTitle {
  color: var(--color-fushia);
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  font-size: 20px;
}
.vote {
  font-size: 20px;
  font-weight: normal;
  color: #f2c43c;
  float: right;
}
.voteIcon {
  margin-bottom: 3px;
  margin-right: 5px;
}
.movieData {
  color: white;
}
.year {
  font-family: "Lato", sans-serif;
  font-weight: 600;
  font-size: 18px;
}
.genres {
  font-size: 14px;
}
.people {
  margin-top: 15px;
}
.people .casting {
  padding-left: 10px;
  font-weight: 400;
}
span {
  color: var(--color-fushia);
}
.overview {
  height: 200px;
  overflow: auto;
  text-align: justify;
  margin-top: 15px;
  padding-right: 10px;
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
  /* background-color: rgba(82,15,73,1); */
  background-color: var(--color-fushia);
}
</style>
