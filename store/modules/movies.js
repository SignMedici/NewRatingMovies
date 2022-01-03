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
  UPDATE_MOVIE: (state, movieToUpdate) => {
    let index = state.movies.findIndex((obj) => obj.id == movieToUpdate["id"]);
    state.movies[index] = movieToUpdate;
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
  deleteMovie({ commit }) {
    axios
      .delete(process.env.baseURL + "/movies/" + id)
      .then(async (response) => {
        await commit("DELETE_MOVIE", id);
        alert(this.$t("deleteDone"));
      });
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
