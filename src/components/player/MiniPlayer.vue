<template>
  <div class="mini-player">
      <div class="player-wrapper">
          <div class="player-left">
              <img src="https://p2.music.126.net/OZUXgQ9GB6bYJyEQ38p0Pw==/109951164746809287.jpg" alt="">
              <div class="player-title">
                  <h3>演员</h3>
                  <p>薛子谦</p>
              </div>
          </div>
          <div class="player-right">
              <div class="play"></div>
              <div class="list"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'MiniPlayer'
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
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
                @include bg_img('../../assets/images/play');
            }
            .list {
                width: 100px;
                height: 100px;
                @include bg_img('../../assets/images/list');
            }
        }
    }
}
</style>