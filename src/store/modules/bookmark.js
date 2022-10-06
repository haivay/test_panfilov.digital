/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { uuid } from 'vue-uuid';

const state = {
  bookmarks: [],
  copiedBookmarkId: -1,
  editBookmark: '',
};

const getters = {
  getAllBookmarks: (state) => state.bookmarks,
  getBookmarksAmount: (state) => state.bookmarks.length,
  getCopiedBookmarkId: (state) => state.copiedBookmarkId,
  getEditBookmark: (state) => state.editBookmark,
};

const mutations = {
  ADD_BOOKMARK(state, { title, url }) {
    const id = uuid.v1();
    state.bookmarks.unshift({ id, title, url });
  },
  SAVE_BOOKMARK(state, { id, title, url }) {
    const oldBookmark = state.bookmarks.find((b) => b.id === id);
    oldBookmark.title = title;
    oldBookmark.url = url;
  },
  EDIT_BOOKMARK(state, payload) {
    state.editBookmark = payload;
  },
  COPY_URL_BOOKMARK(state, { id, url }) {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    state.copiedBookmarkId = id;
    navigator.clipboard.writeText(url);
    timer = setTimeout(() => {
      state.copiedBookmarkId = -1;
    }, 5000);
  },
  DELETE_BOOKMARK(state, id) {
    const bookmark = state.bookmarks.find((el) => el.id === id);
    const index = state.bookmarks.indexOf(bookmark);
    state.bookmarks.splice(index, 1);
  },
};

const actions = {
  saveBookmark({ commit }, payload) {
    commit(payload.id ? 'SAVE_BOOKMARK' : 'ADD_BOOKMARK', payload);
  },
  editBookmark({ commit }, payload) {
    commit('EDIT_BOOKMARK', payload);
  },
  copyUrlBookmark({ commit }, bookmark) {
    commit('COPY_URL_BOOKMARK', bookmark);
  },
  deleteBookmark({ commit }, bookmarkId) {
    commit('DELETE_BOOKMARK', bookmarkId);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
