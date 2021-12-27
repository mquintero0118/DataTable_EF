export default {
  namespaced: true,
  state() {
    return {
      profile: {},
      auth: {
        token: null,
      },
    };
  },
  actions: {
    setUserProfile(context, payload) {
      context.commit('setUserProfile', payload);
    },
    setUserAuth(context, payload) {
      context.commit('setUserAuth', payload);
    },
  },
  mutations: {
    setUserProfile(state, data) {
      state.profile = data;
    },
    setUserAuth(state, data) {
      state.auth.token = data;
    },
  },
  getters: {
    profile(state) {
      return state.profile;
    },
    auth(state) {
      return state.auth;
    },
  },
};
