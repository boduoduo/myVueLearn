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
          <div class="mode"></div>
          <div class="prev"></div>
          <div class="play" @click="playMusic" ref="play"></div>
          <div class="next"></div>
          <div class="favorite"></div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'PlayerBottom',

    methods: {
        ...mapActions([
            'setIsPlaying'
        ]),
        
        playMusic () {
            this.setIsPlaying(!this.isPlaying)
        }
    },

    computed: {
        ...mapGetters([
            'isPlaying'
        ]),
    },

    watch: {
        isPlaying (newValue, oldValue) {
            if (newValue) {
                this.$refs.play.classList.add('active')
            }else {
                this.$refs.play.classList.remove('active')
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
            @include bg_img('../../assets/images/loop');
        }
        .prev {
            @include bg_img('../../assets/images/prev');
        }
        .play {
            @include bg_img('../../assets/images/pause');
            &.active {
                @include bg_img('../../assets/images/play');
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