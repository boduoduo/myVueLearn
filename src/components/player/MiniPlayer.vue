<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="mini-player" v-show="this.isShowMiniPlayer">
      <div class="player-wrapper">
        <div class="player-left" @click="showNormalPlayer">
          <img
            src="https://p2.music.126.net/OZUXgQ9GB6bYJyEQ38p0Pw==/109951164746809287.jpg"
            alt=""
          />
          <div class="player-title">
            <h3>演员</h3>
            <p>薛子谦</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click="play" ref="play"></div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";

export default {
  name: "MiniPlayer",
  methods: {
    ...mapActions(["setFullScreen", "setMiniPlayer", "setIsPlaying"]),
    showList() {
      this.$emit("showList");
    },
    showNormalPlayer() {
      this.setFullScreen(true);
      this.setMiniPlayer(false);
    },
    // 入场动画
    enter(el, done) {
      Velocity(el, "transition.bounceUpIn", { duration: 300 }, function() {
        done();
      });
    },
    // 离开动画
    leave(el, done) {
      Velocity(el, "transition.bounceDownOut", { duration: 300 }, function() {
        done();
      });
    },

    play() {
      this.setIsPlaying(!this.isPlaying);
    }
  },

  computed: {
    ...mapGetters(["isShowMiniPlayer", "isPlaying"])
  },

  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.mini-player {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  .player-wrapper {
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    align-items: center;
    .player-left {
      display: flex;
      padding-left: 30px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .player-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h3 {
          @include font_color();
          @include font_size($font_medium);
        }
        p {
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 84px;
        height: 84px;
        @include bg_img("../../assets/images/pause");
        &.active {
            @include bg_img("../../assets/images/play");
        }
      }
      .list {
        width: 100px;
        height: 100px;
        @include bg_img("../../assets/images/list");
      }
    }
  }
}
</style>
