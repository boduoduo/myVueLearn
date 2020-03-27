<template>
  <div class="player-bottom">
      <div class="bottom-progress">
          <span>00:00</span>
          <div class="progress-bar">
              <div class="progress-line"></div>
              <div class="progress-dot"></div>
          </div>
          <span>00:00</span>
      </div>
      <div class="bottom-control">
          <div class="mode loop" ref="mode" @click="setMode"></div>
          <div class="prev"></div>
          <div class="play" @click="playMusic" ref="play"></div>
          <div class="next"></div>
          <div class="favorite"></div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import mode from '../../store/modeType'

export default {
    name: 'PlayerBottom',

    methods: {
        ...mapActions([
            'setIsPlaying',
            'setModeType'
        ]),
        
        playMusic () {
            this.setIsPlaying(!this.isPlaying)
        },

        setMode () {
            if (this.modeType === mode.loop) {
                this.setModeType(mode.one)
            }else if (this.modeType === mode.one) {
                this.setModeType(mode.random)
            }else if (this.modeType === mode.random) {
                this.setModeType(mode.loop)
            }
        }
    },

    computed: {
        ...mapGetters([
            'isPlaying',
            'modeType'
        ]),
    },

    watch: {
        isPlaying (newValue, oldValue) {
            if (newValue) {
                this.$refs.play.classList.add('active')
            }else {
                this.$refs.play.classList.remove('active')
            }
        },

        modeType (newValue, oldValue) {
            this.$refs.mode.classList.remove('loop')
            this.$refs.mode.classList.remove('one')
            this.$refs.mode.classList.remove('random')
            if (newValue === mode.loop) {
                this.$refs.mode.classList.add('loop')
            }else if (newValue === mode.one) {
                this.$refs.mode.classList.add('one')
            }else if (newValue === mode.random) {
                this.$refs.mode.classList.add('random')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
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
        position: relative;
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
                width: 50%;
                height: 100%;
                background-color: white;
                border-radius: 5px;
            }
            .progress-dot {
                border-radius: 50%;
                width: 20px;
                height: 20px;
                background-color: white;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateY(-50%);
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
                @include bg_img('../../assets/images/loop');
            }
            &.one {
                @include bg_img('../../assets/images/one');
            }
            &.random {
                @include bg_img('../../assets/images/shuffle');
            }
            
        }
        .prev {
            @include bg_img('../../assets/images/prev');
        }
        .play {
            @include bg_img('../../assets/images/play');
            &.active {
                @include bg_img('../../assets/images/pause');
            }
        }
        .next {
            @include bg_img('../../assets/images/next');
        }
        .favorite {
            @include bg_img('../../assets/images/un_favorite');
        }
    }

}
</style>