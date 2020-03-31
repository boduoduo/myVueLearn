<template>
  <div class="account-bottom">
    <div class="bottom-play" @click="selectAllMusic">
      <div class="play-button"></div>
      <span>播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <ScrollView>
        <SongListItem
          :songs="this.switchedNum === 0 ? favoriteList : historyList"
        ></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from "../ScrollView";
import SongListItem from "../SongListItem";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "AccountBottom",

  components: {
    ScrollView,
    SongListItem
  },

  props: {
    switchedNum: {
      type: Number,
      default: 0
    }
  },

  methods: {
    ...mapActions(["setSongDetail", "setFullScreen", 'setCurrentIndex']),
    ...mapMutations(['SET_SONG_DETAIL']),

    selectAllMusic() {
    //   let ids = [];
      if (this.switchedNum === 0) {
        // ids = this.favoriteList.map(item => {
        //   return item.id;
        // });
        this.SET_SONG_DETAIL(this.favoriteList)
      } else {
        // ids = this.historyList.map(item => {
        //   return item.id;
        // });
        this.SET_SONG_DETAIL(this.historyList)
      }
    //   this.setSongDetail(ids);
        this.setFullScreen(true)
        this.setCurrentIndex(0)
    }
  },

  computed: {
    ...mapGetters(["historyList", "favoriteList"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";

.account-bottom {
  position: fixed;
  left: 0;
  top: 100px;
  right: 0;
  bottom: 0;
  .bottom-play {
    width: 260px;
    height: 70px;
    margin: 15px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 35px;
    border: 1px solid #000;
    @include border_color();
    .play-button {
      width: 46px;
      height: 46px;
      @include bg_img("../../assets/images/small_play");
      margin-right: 20px;
    }
    span {
      display: inline-block;
      @include font_color();
      @include font_size($font_medium);
    }
  }
  .bottom-wrapper {
    position: fixed;
    top: 200px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}
</style>
