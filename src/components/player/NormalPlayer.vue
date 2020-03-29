<template>
  <!-- <div class="player" v-show="this.$store.state.isFullScreen"> -->
  <transition
  :css="false"
  @enter="enter"
  @leave="leave"
  >
    <div class="player" v-show="isFullScreen">
      <div class="normal-player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
      </div>
      <div class="player-bg">
        <img
          :src="currentSong.picUrl"
          alt=""
        />
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from "./PlayerHeader";
import PlayerMiddle from "./PlayerMiddle";
import PlayerBottom from "./PlayerBottom";
import { mapGetters, mapActions } from "vuex";
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: "Player",
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    },
  },

  computed: {
    ...mapGetters(["isFullScreen",'currentSong'])
  },

  methods: {
      ...mapActions([
        'getSongLyric'
      ]),

      enter (el, done) {
          Velocity(el, 'transition.shrinkIn', {duration: 300}, function () {
              done()
          })
      },
      leave (el, done) {
          Velocity(el, 'transition.shrinkOut', {duration: 300}, function () {
              done()
          })
      },
  },

  watch: {
    currentSong (newValue, oldValue) {
      if (newValue.id === undefined) {
        return
      }
      this.getSongLyric(newValue.id)
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";

.player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: pink;
  @include bg_sub_color();
  .normal-player-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}
</style>
