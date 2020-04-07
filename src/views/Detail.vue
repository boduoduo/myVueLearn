<template>
  <div class="detail">
    <SubHeader :title="playlist.name"></SubHeader>
    <DetailTop :path="playlist.coverImgUrl" ref="headerImg"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import SubHeader from "../components/detail/SubHeader";
import DetailTop from "../components/detail/DetailTop";
import DetailBottom from "../components/detail/DetailBottom";
import ScrollView from "../components/ScrollView";
import { getPlayList, getAlbumDetail, getArtistsDetail, getTopList } from "../api/index";

export default {
  name: "Detail",
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data() {
    return {
      playlist: {}
    };
  },

  created() {
    if (this.$route.params.type === "personalized") {
      // 获取歌单详情
      getPlayList({ id: this.$route.params.id })
        .then(data => {
          this.playlist = data.playlist;
        })
        .catch(error => {
          console.log(error);
        });

    } else if (this.$route.params.type === "album") {
      // 获取专辑详情
      getAlbumDetail({ id: this.$route.params.id })
        .then(data => {
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.$route.params.type === 'singer') {
      // 歌手歌单详情
      getArtistsDetail({id: this.$route.params.id})
      .then(data => {
           this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
      })
      .catch(error => {
        console.log(error)
      })
    } else if (this.$route.params.type === 'rank') {
      // 排行榜歌单详情
      getTopList({idx: this.$route.params.id})
      .then(data => {
           this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.creator.backgroundUrl,
            tracks: data.playlist.tracks
          }
      })
      .catch(error => {
        console.log(error)
      })
    }
  },

  mounted() {
    let defaultHeight = this.$refs.headerImg.$el.offsetHeight;
    this.$refs.scrollview.scrolling(offsetY => {
      if (offsetY < 0) {
        let opacity =  Math.abs(offsetY) / defaultHeight;
        // 高斯模糊在移动端非常消耗性能，不建议在移动端使用
        // this.$refs.headerImg.$el.style.filter = `blur(${blur}px)`;
        this.$refs.headerImg.changeMaskAlpha(opacity)
      } else {
        let scale = 1 + offsetY / defaultHeight;
        this.$refs.headerImg.$el.style.transform = `scale(${scale})`;
      }
    });
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";

.detail {
  @include bg_sub_color();
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .bottom {
    position: fixed;
    top: 500px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
