/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  openedMenuId: -1,
};

const getters = {
  getOpenedMenuId: (state) => state.openedMenuId,
};

const mutations = {
  OPEN_MENU(state, id) {
    state.openedMenuId = id;
  },
  CLOSE_MENU(state) {
    state.openedMenuId = -1;
  },
};

const actions = {
  openMenu({ commit }, bookmarkId) {
    commit('OPEN_MENU', bookmarkId);
  },
  closeMenu({ commit }) {
    commit('CLOSE_MENU');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
