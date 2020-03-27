import Network from './mbnetwork'

// 获取Banner数据
export const getMyBanner = () => Network.mb_get('/banner?type=2')
// 获取推荐歌单
export const getPersonalized = () => Network.mb_get('/personalized?limit=6')
// 获取最新专辑
export const getNewestAlbum = () => Network.mb_get('/album/newest')
// 获取最新歌单
export const getNewestSong = () => Network.mb_get('/personalized/newsong')
// 获取歌单详情
export const getPlayList = (data) => Network.mb_get('/playlist/detail', data)
// 获取专辑详情
export const getAlbumDetail = (data) => Network.mb_get('/album', data)
// 获取歌曲详情
export const getSongDetail = (data) => Network.mb_get('/song/detail', data)
