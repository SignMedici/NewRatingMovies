//State
const state = () => {
  return {
    users: [],
  };
};

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
};

//Actions
const actions = {
  async setUsers({ commit }) {
    const response = await this.$axios
      .get(process.env.baseURL + "/users")
      .then((response) => {
        commit("SET_USERS", response.data);
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },
  async updateUser({ commit }, user) {
    const response = await this.$axios
      .patch(process.env.baseURL + "/users/" + user._id, user)
      .then((response) => {
        commit("UPDATE_USER", response.data);
      })
      .catch((err) => {
        this.$toast.error(err);
      });
  },
  async deleteUser({ commit }, id) {
    const response = await this.$axios
      .delete(process.env.baseURL + "/user/" + id)
      .then((response) => {
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
