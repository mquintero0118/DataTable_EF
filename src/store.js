import { createStore } from 'vuex';

export default createStore({
  state: {
    layout: '',
    title: '',
    sidemenu: null,
    sidebar: {
      entries: [],
    },
  },
  mutations: {
    setLayout(state, layout) {
      state.layout = layout;
    },
    setTitle(state, title) {
      state.title = title;
    },
    setSidemenu(state, component) {
      state.sidemenu = component;
    },
    setSidebarEntries(state, entries) {
      state.sidebar.entries = entries;
    },
  },
});
