<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="list-player" v-show="isShowListPlayer">
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left">
            <div class="mode loop" @click="setMode" ref="mode"></div>
            <p>{{modeText}}</p>
          </div>
          <div class="top-right">
            <div class="del" @click="delAll"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="scrollView">
            <ul ref="play">
              <li class="item" v-for="(value, index) in songs" :key="value.id" @click="selectMusic(index)">
                <div class="item-left">
                  <div class="item-play" @click.stop="play" v-show="currentIndex === index"></div>
                  <p>{{value.name}}</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite" @click.stop="favorite(value)" :class="{'active' : isFavorite(value)}"></div>
                  <div class="item-del" @click.stop="del(index)"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom">
          <p @click="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from "../../components/ScrollView";
import { mapActions, mapGetters } from "vuex";
import mode from '../../store/modeType'

export default {
  name: "ListPlayer",
  data() {
    return {
      modeText: '顺序播放',
    };
  },
   computed: {
    ...mapGetters([
        "isPlaying", 
        "modeType", 
        'isShowListPlayer', 
        'songs', 
        'currentIndex',
        'favoriteList'
        ])
  },

  methods: {
    ...mapActions([
        "setIsPlaying", 
        "setModeType", 
        'setListPlayer', 
        'setDelSong',
        'setCurrentIndex',
        'setFavoriteSong'
        ]),

    hidden() {
      this.setListPlayer(false);
    },
    // 入场动画
    enter(el, done) {
      Velocity(el, "transition.slideRightIn", { duration: 300 }, function() {
        done();
      });
    },
    // 离开动画
    leave(el, done) {
      Velocity(
        el,
        "transition.slideRightOut",
        { duration: 300 },
        function() {
          done();
        }
      );
    },

    play() {
      this.setIsPlaying(!this.isPlaying);
    },

    setMode() {
      if (this.modeType === mode.loop) {
        this.setModeType(mode.one);
      } else if (this.modeType === mode.one) {
        this.setModeType(mode.random);
      } else if (this.modeType === mode.random) {
        this.setModeType(mode.loop);
      }
    },

    del(index) {
      this.setDelSong(index)
    },

    delAll () {
       this.setDelSong()
    },

    selectMusic(index) {
        this.setCurrentIndex(index)
    },

    favorite (value) {
        this.setFavoriteSong(value)
    },

    isFavorite (value) {
        let result = this.favoriteList.find(curSong => {
            return curSong.id === value.id
        })
        return result !== undefined
    }
  },
  components: {
    ScrollView
  },

  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },
    modeType(newValue, oldValue) {
      this.$refs.mode.classList.remove("loop");
      this.$refs.mode.classList.remove("one");
      this.$refs.mode.classList.remove("random");
      if (newValue === mode.loop) {
        this.$refs.mode.classList.add("loop");
        this.modeText = '循环播放'
      } else if (newValue === mode.one) {
        this.$refs.mode.classList.add("one");
        this.modeText = '单曲循环'
      } else if (newValue === mode.random) {
        this.$refs.mode.classList.add("random");
        this.modeText = '随机播放'
      }
    },

    isShowListPlayer(newValue, oldValue) {
        this.$refs.scrollView.refresh()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";
@import "../../assets/css/variable";

.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .player-top {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top-left {
      display: flex;
      align-items: center;
      padding-left: 20px;
      .mode {
        width: 56px;
        height: 56px;
        margin-right: 20px;
        &.loop {
          @include bg_img("../../assets/images/small_loop");
        }
        &.one {
          @include bg_img("../../assets/images/small_one");
        }
        &.random {
          @include bg_img("../../assets/images/small_shuffle");
        }
        
      }
      p {
        @include font_color();
        @include font_size($font_medium_s);
      }
    }
    .top-right {
      .del {
        width: 84px;
        height: 84px;
        @include bg_img("../../assets/images/small_del");
      }
    }
  }
  .player-middle {
      height: 700px;
      overflow: hidden;
      ul {
          &.active {
              .item {
                .item-play {
                    @include bg_img("../../assets/images/small_pause");
                }
              }
          }
      }
    .item {
      border-top: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      height: 100px;
      .item-left {
        display: flex;
        align-items: center;
        .item-play {
          width: 56px;
          height: 56px;
          @include bg_img("../../assets/images/small_play");
        }
        p {
          @include font_color();
          @include font_size($font_medium_s);
          @include no_wrap();
          margin-left: 20px;
        }
      }
      .item-right {
        display: flex;
        align-items: center;
        .item-favorite {
          width: 56px;
          height: 56px;
          @include bg_img("../../assets/images/small_un_favorite");
          &.active {
            @include bg_img("../../assets/images/small_favorite");
          }
        }
        .item-del {
          width: 52px;
          height: 52px;
          margin-left: 20px;
          @include bg_img("../../assets/images/small_close");
        }
      }
    }
  }
  .player-bottom {
    width: 100%;
    height: 100px;
    line-height: 100px;
    @include bg_color();
    p {
      text-align: center;
      color: white;
      @include font_size($font_medium);
    }
  }
}
</style>
