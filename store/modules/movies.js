import axios from "axios";

//State
const state = () => {
  return {
    movies: [],
    result: [],
  };
};

//Mutations
const mutations = {
  SET_MOVIES: (state, allMovies) => {
    state.movies = allMovies;
  },

  ADD_MOVIE: (state, movie) => {
    state.movies.push(movie);
  },

  UPDATE_MOVIE: (state, movieToUpdate) => {
    let index = state.movies.findIndex((obj) => obj.id == movieToUpdate["id"]);
    state.movies[index] = movieToUpdate;
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
  },

  SET_RESULT: (state, result) => {
    state.result = [];
    state.result.push(result);
  },
};

//Actions
const actions = {
  async setMovies({ commit }) {
    const response = await axios
      .get(process.env.baseURL + "/movies")
      .then((response) => {
        commit("SET_MOVIES", response.data);
      });
  },

  async addMovie({ commit }, data) {
    const response = await axios
      .post(process.env.baseURL + "/movies", data)
      .then((response) => {
        commit("ADD_MOVIE", data);
        this.$toast.success(this.$t("addDone"));
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },

  async updateMovie({ commit }, data) {
    const response = await axios
      .patch(process.env.baseURL + "/movies/" + data.id, data.newInfo)
      .then((response) => {
        commit("UPDATE_MOVIE", response.data);
        this.$toast.success(this.$t("updateDone"));
        this.$router.push("/admin");
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },

  async deleteMovie({ commit }, id) {
    console.log("store deletemovie: ", id);
    const response = await axios
      .delete(process.env.baseURL + "/movies/" + id)
      .then((response) => {
        commit("DELETE_MOVIE", id);
        this.$toast.success(this.$t("deleteDone"));
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },
  async getSearchResults() {
    /* const response = await axios
    .post(
        process.env.baseURL +
        "/movies/search/" +
        this.title.replace(" ", "+") +
        "/" +
        this.siteLang
    )
    .then((response) => {
      commit('SET_RESULT',response.data);
      this.results = "OK";
    }); */
  },
};

//Getters
const getters = {
  getMovies(state) {
    return state.movies;
  },
  getResult(state) {
    return state.result[0];
  },
  getMovieById: (state) => (id) => {
    let index = state.movies.findIndex((obj) => obj._id == id);
    return state.movies[index];
  },
  idInDb: (state) => (id) => {
    let index = state.movies.findIndex((obj) => obj.movieDbId == id);
    if (index == -1) {
      return "Add OK";
    } else {
      return "Already in DB";
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
