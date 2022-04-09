<template>
  <div class="movieDesktop" v-if="showData">
    <div class="movieDescription">
      <!-- Poster -->
      <div id="poster">
        <figure>
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
      <div class="movieText">
        <div class="movieDesc">
          <div class="d-flex justify-content-between align-items-center">
            <!-- Title -->
            <div id="title">
              <span
                v-if="currentMovie[siteLang].title.length <= 33"
                class="bigTitle"
                >{{ currentMovie[siteLang].title }}</span
              >
              <span v-else class="smallTitle">{{
                currentMovie[siteLang].title
              }}</span>
            </div>
            <div id="vote">
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
          </div>
          <!-- Movie details -->
          <div class="movieData">
            <!-- Year -->
            <div v-if="currentMovie.release_date" class="year">
              {{ currentMovie.release_date.substring(0, 4) }}
            </div>
            <!-- Genres -->
            <div>
              <span
                class="genre"
                v-if="currentMovie.genre"
                v-for="movieGenre in currentMovie.genre"
                >{{ $t(movieGenre) }}</span
              >
            </div>

            <!-- People -->
            <div class="people">
              <table>
                <tr v-show="currentMovie.director">
                  <td>
                    <span>{{ $t("director") }}</span>
                  </td>
                  <td>
                    <!-- Director -->
                    <div class="casting">{{ currentMovie.director }}</div>
                  </td>
                </tr>
                <tr v-if="currentMovie.casting">
                  <td>
                    <span>{{ $t("casting") }}</span>
                  </td>
                  <td>
                    <!-- Actors -->
                    <div class="casting">{{ currentMovie.casting }}</div>
                  </td>
                </tr>
              </table>
            </div>
            <!-- Overview -->
            <div v-if="currentMovie[siteLang].overview" class="overview">
              {{ currentMovie[siteLang].overview }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <MovieTrailers
      :trailers="currentMovie[siteLang].trailers.slice(fromIndex, toIndex)"
    />
    <UIPaginator
      :perPage="perPage"
      :totalItems="currentMovie[siteLang].trailers.length"
      @changePage="changePageContent"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "MovieOverview",
  data() {
    return {
      siteLang: this.$i18n.locale,
      url: process.env.apiPicURL,
      baseVideoURL: process.env.VIDEO_URL,
      noPic: "~/assets/no_picture.png",
      showData: false,
      perPage: 6,
      currentPage: 1,
      fromIndex: 0,
      toIndex: 6,
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
span {
  white-space: nowrap;
}
.movieDesktop {
  display: block;
}
.movieDescription {
  max-width: 80%;
  height: auto;
  display: flex;
  background-color: var(--color-purple);
  padding: 20px;
  border-radius: 10px;
  border: 0;
  margin: 0 auto;
}
.genre + .genre::before {
  content: ", ";
}
img {
  float: left;
  width: auto;
  max-width: 300px;
  height: 450px;
  border: 0;
  border-radius: 10px;
  background-color: whitesmoke;
}
.defaultPicContainer {
  width: 300px;
  height: 450px;
  background-color: whitesmoke;
  border: 0;
  border-radius: 10px;
}
.defaultPic {
  width: 300px;
  height: auto;
}
.movieText {
  display: flex;
  padding-left: 20px;
}
.movieDesc {
  display: block;
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
  margin: 25px 0;
}
.people .casting {
  padding-left: 10px;
  font-weight: 400;
}
table {
  font-size: 15px;
}
table span {
  color: var(--color-fushia);
}
.overview {
  height: 260px;
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

@media (max-width: 1024px) {
  .movieDesktop {
    display: none;
  }
}
</style>
