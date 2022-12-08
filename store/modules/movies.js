//State
const state = () => {
  return {
    movies: [], // For results coming from DB
    results: [], // For search results from API and getMovieById
    currentMovie: {}, // movie to display
    nbItems: 0, // For paginator
  };
};

//Mutations
const mutations = {
  SET_MOVIES: (state, allMovies) => {
    state.movies = allMovies;
  },

  SET_NB_ITEMS: (state, nb) => {
    state.nbItems = nb;
  },

  ADD_MOVIE: (state, movie) => {
    state.movies.push(movie);
  },

  UPDATE_MOVIE: (state, movieToUpdate) => {
    let index = state.movies.findIndex((obj) => obj._id === movieToUpdate.id);
    Object.keys(movieToUpdate.newInfo).forEach((key) => {
      state.movies[index][key] = movieToUpdate.newInfo[key];
    });
  },

  DELETE_MOVIE: (state, idToRemove) => {
    state.movies.splice(
      state.movies
        .map(function (movie) {
          return movie._id;
        })
        .indexOf(idToRemove),
      1
    );
    state.nbMovies = state.nbMovies - 1;
  },

  SET_RESULTS: (state, results) => {
    state.results = [];
    state.results.push(...results);
    console.log("🚀 ~ state.results", state.results);
  },

  SET_CURRENT_MOVIE: (state, movie) => {
    state.currentMovie = movie;
  },

  RESET_CURRENT_MOVIE: (state) => {
    state.movie = {};
  },
  RESET_RESULTS: (state) => {
    state.results = [];
  },
};

//Actions
const actions = {
  async getMovies({ commit }, pagination) {
    const response = await this.$axios
      .get(
        process.env.baseURL +
          `/movies?page=${pagination.page}&size=${pagination.size}`
      )
      .then((response) => {
        let pagingMoviesDTO = response.data;
        commit("SET_MOVIES", pagingMoviesDTO.Data);
        commit("SET_NB_ITEMS", pagingMoviesDTO.NbResults);
      })
      .catch((error) => {
        if (error.response.data.message.includes("bad-params" && "data"))
          this.$toast.error(this.$t("badDataType"));
        else if (
          error.response.data.message.includes(
            "bad-params" && ("page" || "Size")
          )
        )
          this.$toast.error(this.$t("badPagingParams"));
        else this.$toast.error(this.$t("serverError"));
      });
  },

  // get information of favorite movies
  async getUserFavorites({ commit }, [userId, page, size]) {
    const response = await this.$axios
      .get(
        process.env.baseURL +
          `/users/${userId}/favorites?page=${page}&size=${size}`
      )
      .then(async (response) => {
        await commit("SET_RESULTS", response.data.movies);
        await commit("SET_NB_ITEMS", response.data.nbFavorites);
      });
  },

  async getMovieById({ commit }, id) {
    const response = await this.$axios
      .get(process.env.baseURL + "/movies/" + id)
      .then((response) => {
        commit("SET_CURRENT_MOVIE", response.data);
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },

  async addMovie({ commit }, data) {
    const response = await this.$axios
      .post(process.env.baseURL + "/movies", data)
      .then((response) => {
        commit("ADD_MOVIE", data);
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },

  async updateMovie({ commit }, data) {
    const response = await this.$axios
      .patch(process.env.baseURL + "/movies/" + data.id, data.newInfo)
      .then((response) => {
        commit("UPDATE_MOVIE", data);
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },

  async deleteMovie({ commit }, id) {
    const response = await this.$axios
      .delete(process.env.baseURL + "/movies/" + id)
      .then((response) => {
        commit("DELETE_MOVIE", response.deletedId);
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },

  //Get search results from API
  async getSearchResults({ commit }, [title, language]) {
    const response = await this.$axios
      .get(process.env.baseURL + "/search/" + title + "/" + language)
      .then((response) => {
        commit("SET_RESULTS", response.data);
      });
  },

  // check if the concerned movieDBId is in DB
  async idInDb({ commit }, movieDBId) {
    const response = await this.$axios
      .get(process.env.baseURL + "/movies/check/" + movieDBId)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        this.$toast.error(this.$t("alreadyInCatalog"));
      });
  },

  resetCurrentMovie({ commit }) {
    commit("RESET_CURRENT_MOVIE");
  },
  resetResults({ commit }) {
    commit("RESET_RESULTS");
  },
};

//Getters
const getters = {
  getMovies(state) {
    return state.movies;
  },
  getNbMovies(state) {
    return state.nbMovies;
  },
  getResults(state) {
    return state.results;
  },
  getMovieById: (state) => (id) => {
    let index = state.movies.findIndex((obj) => obj._id == id);
    return state.movies[index];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
