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
    state.results.push(results);
  },

  SET_CURRENT_MOVIE: (state, movie) => {
    state.currentMovie = movie;
  },

  RESET_CURRENT_MOVIE: (state) => {
    state.movie = {};
  },
};

//Actions
const actions = {
  async getMovies({ commit }, [page, size, data]) {
    const response = await this.$axios
      .get(
        process.env.baseURL + `/movies?page=${page}&size=${size}&data=${data}`
      )
      .then((response) => {
        commit("SET_MOVIES", response.data.movies);
        commit("SET_NB_ITEMS", response.data.nbMovies);
      });
  },

  // get information of favorite movies
  async getUserFavorites({ commit }, [userId, page, perPage]) {
    const response = await this.$axios
      .get(
        process.env.baseURL +
          `/users/${userId}/favorites?page=${page}&size=${perPage}`
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
      .post(
        process.env.baseURL + "/the-movie-db/search/" + title + "/" + language
      )
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
