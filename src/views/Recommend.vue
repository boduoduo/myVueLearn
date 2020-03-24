<template>
  <div class="recommend">
    <div class="recommend-wrapper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized
            :personalized="personalized"
            :type="'personalized'"
            :title="'推荐歌单'"
            @select="fatherSelectItem"
          ></Personalized>
          <Personalized
            :personalized="albums"
            :type="'album'"
            :title="'最新专辑'"
            @select="fatherSelectItem"
          ></Personalized>
          <SongList :songs="songs"></SongList>
        </div>
      </ScrollView>
    </div>

    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {
  getMyBanner,
  getPersonalized,
  getNewestAlbum,
  getNewestSong
} from "../api/index";
import Banner from "../components/recommend/Banner";
import Personalized from "../components/recommend/Personalized";
import SongList from "../components/recommend/SongList";
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
    fatherSelectItem(id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      });
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
  // overflow: hidden;
  .recommend-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.v-enter {
  transform: translateX(100%);
}

.v-enter-to {
  transform: translateX(0%);
}

.v-enter-active {
  transition: transform 0.25s;
}

.v-leave {
  transform: translateX(0%);
}

.v-leave-to {
  transform: translateX(100%);
}

.v-leave-active {
  transition: transform 0.25s;
}
</style>
