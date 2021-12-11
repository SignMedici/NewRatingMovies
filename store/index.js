const store = {
  state() {
    return {
      movies: [],
      result: [],
      users: [],
      siteLang: "fr",
    };
  },
  getters: {
    // App
    isAuthenticated(state) {
      return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
    },
    getSiteLang(state) {
      return state.siteLang;
    },

    // Users
    // Get logged user
    getUserInfo(state) {
      return state.auth.user;
    },
    // Get all users
    getterUsers(state) {
      return state.users;
    },
    // Get user by id
    getUserById: (state) => (id) => {
      let index = state.users.findIndex((obj) => obj._id == id);
      return state.users[index];
    },

    // Movies
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
  },
  mutations: {
    // Site language
    SET_LANG: (state, langCode) => {
      state.siteLang = langCode;
    },

    // Movies
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
      let index = state.movies.findIndex(
        (obj) => obj.id == movieToUpdate["id"]
      );
      state.movies[index] = movieToUpdate;
    },
    RATE_MOVIE: (state, myRate) => {
      let index = state.auth.user.myRates.findIndex(
        (rate) => rate.movieDbId === myRate.movieDbId
      );

      if (index > -1) {
        state.auth.user.myRates[index].movieDbId = myRate.rate;
      } else {
        state.auth.user.myRates.push({
          movieDbId: myRate.movieDbId,
          rate: myRate.rate,
        });
      }
    },
    SET_RESULT: (state, result) => {
      state.result = [];
      state.result.push(result);
    },

    // Users
    GET_USERS: (state, users) => {
      state.users = users;
    },

    UPDATE_USER: (state, data) => {
      let index = state.users.findIndex((obj) => obj.id == data["id"]);
      state.users[index] = data;
    },

    UPDATE_LOGGED_USER: (state, data) => {
      if (data.nickname) state.auth.user["nickname"] = data.nickname;
      if (data.email) state.auth.user["email"] = data.email;
      if (data.language) state.auth.user["language"] = data.language;
    },

    DELETE_USER: (state, idToRemove) => {
      state.users.splice(
        state.users
          .map(function (user) {
            return user.id;
          })
          .indexOf(idToRemove),
        1
      );
    },
  },
  actions: {
    async nuxtServerInit({ commit }) {
      // get all movies
      const response = await this.$axios
        .get(process.env.baseURL + "/movies")
        .then((response) => {
          commit("SET_MOVIES", response.data);
        });

      // Site language
      if (this.$cookiz.get("siteLang")) {
        commit("SET_LANG", this.$cookiz.get("siteLang"));
      }
    },

    //user
    getUsers({ commit }) {
      this.$axios
        .get(process.env.baseURL + "/users")
        .then((response) => {
          commit("GET_USERS", response.data);
        })
        .catch((err) => {
          this.$toast.error(err);
        });
    },
    updateUser({ commit }, user) {
      this.$axios
        .patch(process.env.baseURL + "/users/" + user._id, user)
        .then((response) => {
          commit("UPDATE_USER", response.data);
        })
        .catch((err) => {
          this.$toast.error(err);
        });
    },
    deleteUser({ commit }, id) {
      this.$axios
        .delete(process.env.baseURL + "/user/" + id)
        .then((response) => {
          commit("DELETE_USER", response.data);
        });
    },
  },
};

export default store;
