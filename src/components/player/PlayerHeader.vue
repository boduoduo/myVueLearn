<template>
  <div class="header">
    <div class="header-left" @click="hiddenNormalPlayer"></div>
    <div class="header-title">
      <h3>{{currentSong.name}}</h3>
      <p>{{currentSong.singer}}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "PlayerHeader",
  methods: {
      ...mapActions([
          'setFullScreen',
          'setMiniPlayer'
      ]),

      hiddenNormalPlayer () {
          this.setFullScreen(false)
          this.setMiniPlayer(true)
      }
  },

  computed: {
    ...mapGetters([
      'currentSong'
      ])
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";

.header {
  position: relative;
  z-index: 999;
  width: 100%;
  height: 100px;
//   @include bg_color();
  display: flex;
  justify-content: space-between;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    @include bg_img("../../assets/images/down");
  }
  .header-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: white;
    text-align: center;
    h3 {
      font-weight: bold;
      @include font_size($font_medium);
      @include no-wrap();
    }
    p {
      @include font_size($font_samll);
      @include no-wrap();
    }
  }
}
</style>
