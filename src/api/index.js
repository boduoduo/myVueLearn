import Network from './mbnetwork'
import { Promise } from 'core-js'

// 获取Banner数据
export const getMyBanner = () => Network.mb_get('/banner?type=2')
// 获取推荐歌单
export const getPersonalized = () => Network.mb_get('/personalized?limit=12')
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
// 获取歌词
export const getSongLyric = (data) => Network.mb_get('/lyric', data)
// 获取歌曲播放地址
export const getSongURL = (data) => Network.mb_get('/song/url', data)
// 获取歌手详情
export const getArtistsDetail = (data) => Network.mb_get('/artists', data)
// 获取热门歌手
export const getHotArtists = () => {
    return new Promise((resolve, reject) => {
        Network.mb_get('/top/artists?offset=0&limit=5')
        .then((res)=>{
            resolve(res.artists)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}
// 获取字母的歌手
export const getLettersArtists = (letter) => {
    return new Promise((resolve, reject) => {
        let letterArtists = []
        Network.mb_all([
            Network.mb_get(`artist/list?offset=0&limit=5&cat=1001&initial=${letter}`),
            // 后面的都是一样的，cat参数已失效
            // Network.mb_get(`artist/list?offset=0&limit=5&cat=2001&initial=${letter}`),
            // Network.mb_get(`artist/list?offset=0&limit=5&cat=6001&initial=${letter}`),
            // Network.mb_get(`artist/list?offset=0&limit=5&cat=7001&initial=${letter}`),
            // Network.mb_get(`artist/list?offset=0&limit=5&cat=4001&initial=${letter}`),
            // Network.mb_get(`artist/list?offset=0&limit=5&cat=5003&initial=${letter}`),
        ])
        .then(result => {
            result.forEach(item => {
                letterArtists.push(...item.artists)
            });
            resolve(letterArtists)
        })
        .catch(error => {
            reject(error)
        })
    })
}
// 获取A-Z字母的歌手
export const getAllArtists = () => {
    return new Promise((resolve, reject) => {
        let keys = ['热']
        let list = [getHotArtists()]
        for (let i = 65; i < 91; i++) {
            let char = String.fromCharCode(i)
            keys.push(char)
            list.push(getLettersArtists(char))
        }
        Network.mb_all(list)
        .then(result => {
            let obj = {}
            obj.keys = keys
            obj.list = result
            resolve(obj) 
        })
        .catch(err => {
            reject(err)
        })
    })
}