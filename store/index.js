import usersStore from "./modules/users.js";
import moviesStore from "./modules/movies.js";

const store = {
  state() {
    return {
      siteLang: "fr",
    };
  },

  mutations: {
    SET_LANG: (state, langCode) => {
      state.siteLang = langCode;
    },
  },

  actions: {
    async nuxtServerInit({ dispatch, commit }) {
      //set all movies
      await dispatch("moviesStore/setMovies");

      // Site language
      if (this.$cookiz.get("siteLang")) {
        commit("SET_LANG", this.$cookiz.get("siteLang"));
      }
    },
  },

  getters: {
    //Check if a user is authenticated
    isAuthenticated(state) {
      return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
    },

    //Logged User
    getUserInfo(state) {
      return state.auth.user;
    },

    // get movie information of logged favorites
    getUserFavorites(state) {
      let userFavorites = [];

      if (state.auth.user) {
        let userFav = state.auth.user.myFavorites;
        userFav.forEach((movieDbId) => {
          state.movies.forEach((movie) => {
            if (movie.movieDbId === movieDbId) {
              userFavorites.push(movie);
            }
          });
        });
      }
      return userFavorites;
    },

    // get the current language of the webpage
    getSiteLang(state) {
      return state.siteLang;
    },
  },

  modules: {
    usersStore,
    moviesStore,
  },
};

export default store;
