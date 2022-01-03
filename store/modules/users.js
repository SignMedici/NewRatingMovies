//State
const state = () => ({
  users: [],
});

//Mutations
const mutations = {
  // Gets all users fro
  SET_USERS: (state, users) => {
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

  UPDATE_FAVORITE: (state, movieDbId) => {
    let index = state.auth.user.myFavorites.indexOf(movieDbId);

    if (index >= 0) {
      state.auth.user.myFavorites.splice(index, 1);
    } else {
      state.auth.user.myFavorites.push(movieDbId);
    }
  },
};

//Actions
const actions = {
  setUsers({ commit }) {
    this.$axios
      .get(process.env.baseURL + "/users")
      .then((response) => {
        commit("SET_USERS", response.data);
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
    this.$axios.delete(process.env.baseURL + "/user/" + id).then((response) => {
      commit("DELETE_USER", response.data);
    });
  },
};

//Getters
const getters = {
  // Get all users
  getUsers(state) {
    return state.users;
  },
  // Get user by id
  getUserById: (state) => (id) => {
    let index = state.users.findIndex((obj) => obj._id == id);
    return state.users[index];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
