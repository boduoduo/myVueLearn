<template>
  <div class="recommend">
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner>
        <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem"></Personalized>
        <Personalized :personalized="albums" :title="'最新专辑'"></Personalized>
        <SongList :songs="songs"></SongList>
      </div>
    </ScrollView>
    <router-view></router-view>
  </div>
</template>

<script>
import {
  getMyBanner,
  getPersonalized,
  getNewestAlbum,
  getNewestSong
} from "../api/index";
import Banner from "../components/Banner";
import Personalized from "../components/Personalized";
import SongList from "../components/SongList";
import ScrollView from "../components/ScrollView";

export default {
  name: "Recommend",
  data() {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    };
  },

  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },

  methods: {
    fatherSelectItem (id) {
      this.$router.push({
        path: `/recommend/detail/${id}`
      })
    }
  },

  created() {
    // 获取banner
    getMyBanner()
      .then(data => {
        this.banners = data.banners;
      })
      .catch(function(error) {
        console.log(error);
      });
    //获取推荐歌单
    getPersonalized()
      .then(data => {
        this.personalized = data.result;
      })
      .catch(function(error) {
        console.log(error);
      });
    // 获取最新专辑
    getNewestAlbum()
      .then(data => {
        this.albums = data.albums.splice(0, 6);
      })
      .catch(function(error) {
        console.log(error);
      });
    // 最新歌曲
    getNewestSong()
      .then(data => {
        this.songs = data.result;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scope lang="scss">
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>