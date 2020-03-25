import { SET_FULL_SCREEN, SET_MINI_PLAYER, SET_IS_PLAYING } from "./mutations-type";

export default {
  // 字符串当方法名，需加上[]
  [SET_FULL_SCREEN](state, flag) {
    state.isFullScreen = flag;
  },

  [SET_MINI_PLAYER](state, flag) {
    state.isShowMiniPlayer = flag;
  },

  [SET_IS_PLAYING](state, flag) {
    state.isPlaying = flag;
  },
};
