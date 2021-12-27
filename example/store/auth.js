export default {
  namespaced: true,
  state() {
    return {
      session: {},
    };
  },
  actions: {
    setSession(context, payload) {
      context.commit('setUserProfile', payload);
    },
    deleteSession(context) {
      context.commit('deleteSession');
    },
  },
  mutations: {
    setSession(state, data) {
      state.session = data;
    },
    deleteSession(state) {
      state.session = {};
    },
  },
  getters: {
    session(state) {
      return state.session;
    },
  },
};
