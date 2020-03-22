import Network from './mbnetwork'

// 获取Banner数据
export const getMyBanner = () => Network.mb_get('/banner?type=2')
// 获取推荐歌单
export const getPersonalized = () => Network.mb_get('/personalized?limit=6')
// 获取最新专辑
export const getNewestAlbum = () => Network.mb_get('/album/newest')
// 获取最新歌单
export const getNewestSong = () => Network.mb_get('/personalized/newsong')