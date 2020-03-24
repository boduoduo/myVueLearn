<template>
  <div class="player">
    <div class="normal-player-wrapper">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle></PlayerMiddle>
      <PlayerBottom></PlayerBottom>
    </div>
    <div class="player-bg">
        <img src="https://p2.music.126.net/OZUXgQ9GB6bYJyEQ38p0Pw==/109951164746809287.jpg" alt="">
    </div>
  </div>
</template>

<script>
import PlayerHeader from "./PlayerHeader";
import PlayerMiddle from "./PlayerMiddle";
import PlayerBottom from "./PlayerBottom";
export default {
  name: "Player",
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
@import '../../assets/css/mixin';

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
          transform: translate(-50%,-50%);
          filter: blur(10px);
      }
  }
}
</style>
