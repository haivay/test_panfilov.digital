import { createStore } from 'vuex';
import bookmark from './modules/bookmark';
import controlModal from './modules/controlModal';
import menu from './modules/menu';

export default createStore({
  modules: {
    bookmark,
    controlModal,
    menu,
  },
});
