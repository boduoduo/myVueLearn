<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
            <div class="progress-dot" ref="progressDot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="bottom-control">
      <div class="mode loop" ref="mode" @click="setMode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="playMusic" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite" @click="favorite" :class="{'active' : isFavorite()}"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import mode from "../../store/modeType";
import { formartTime } from "../../tools/tool";

export default {
  name: "PlayerBottom",

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
    }
  },

  methods: {
    ...mapActions([
        "setIsPlaying", 
        "setModeType", 
        "setCurrentIndex", 
        'setCurrentPlayTime',
        'setFavoriteSong'
        ]),

    playMusic() {
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

    prev() {
      this.setCurrentIndex(this.currentIndex - 1);
    },

    next() {
      this.setCurrentIndex(this.currentIndex + 1);
    },

    progressClick(e) {
      // 计算进度条的位置
      let normalLeft = this.$refs.progressBar.offsetLeft
      let eventLeft = e.pageX
      let clickLeft = eventLeft - normalLeft
      let progressWidth = this.$refs.progressBar.offsetWidth
      let percent = clickLeft / progressWidth
      this.$refs.progressLine.style.width = percent * 100 + "%"
      let curTime = this.totalTime * percent
       // 设置当前播放时间   
       this.setCurrentPlayTime(curTime)
    },

    favorite() {
       this.setFavoriteSong(this.currentSong)
    },

    isFavorite() {
      let result = this.favoriteList.find(currentValue => {
          return currentValue.id === this.currentSong.id
      })
      return result !== undefined
    }
  },

  computed: {
    ...mapGetters([
        "isPlaying", 
        "modeType", 
        "currentIndex",
        'currentSong',
        'favoriteList'
        ])
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
      } else if (newValue === mode.one) {
        this.$refs.mode.classList.add("one");
      } else if (newValue === mode.random) {
        this.$refs.mode.classList.add("random");
      }
    },

    totalTime(newValue, oldValue) {
      let time = formartTime(newValue);
      this.$refs.eleTotalTime.innerHTML = time.minute + ":" + time.second;
    },
    currentTime(newValue, oldValue) {
      let time = formartTime(newValue);
      this.$refs.eleCurrentTime.innerHTML = time.minute + ":" + time.second;
      let percent = (newValue / this.totalTime) * 100;
      this.$refs.progressLine.style.width = percent + "%";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.player-bottom {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include font_color();
      @include font_size($font_samll);
    }
    .progress-bar {
      width: 100%;
      margin: 0 10px;
      height: 10px;
      background-color: #ccc;
      border-radius: 5px;
      .progress-line {
        position: relative;
        width: 0%;
        height: 100%;
        background-color: white;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        .progress-dot {
          border-radius: 50%;
          width: 20px;
          height: 20px;
          background-color: white;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom-control {
    width: 80%;
    margin: 0 auto;
    padding: 50px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      &.loop {
        @include bg_img("../../assets/images/loop");
      }
      &.one {
        @include bg_img("../../assets/images/one");
      }
      &.random {
        @include bg_img("../../assets/images/shuffle");
      }
    }
    .prev {
      @include bg_img("../../assets/images/prev");
    }
    .play {
      @include bg_img("../../assets/images/play");
      &.active {
        @include bg_img("../../assets/images/pause");
      }
    }
    .next {
      @include bg_img("../../assets/images/next");
    }
    .favorite {
      @include bg_img("../../assets/images/un_favorite");
      &.active {
          @include bg_img("../../assets/images/favorite");
      }
    }
  }
}
</style>