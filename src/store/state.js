import mode from './modeType'

export default {
  isFullScreen: false,
  isShowMiniPlayer: false,
  isPlaying: false,
  modeType: mode.loop,
  isShowListPlayer: false,
  songs: [],
  currentSong: {},
  currentIndex: 0,
  currentLyric: {},
  currentPlayTime: 0, // 当前播放时间
  favoriteList: []  // 收藏的歌曲
};
