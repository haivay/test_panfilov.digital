/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  isControlModalOpen: false,
};

const getters = {
  getControlModalStatus: (state) => state.isControlModalOpen,
};

const mutations = {
  TOGGLE_CONTROL_MODAL(state) {
    state.isControlModalOpen = !state.isControlModalOpen;
  },
};

const actions = {
  toggleControlModal({ commit }) {
    commit('TOGGLE_CONTROL_MODAL');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
