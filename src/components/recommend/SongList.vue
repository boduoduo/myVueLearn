<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <SongListItem :songs="songs"></SongListItem>
  </div>
</template>

<script>
import SongListItem from '../SongListItem'

export default {
  name: "SongList",
  components: {
    SongListItem
  },

  props: {
    songs: {
      type: Array,
      default: [],
      required: true
    }
  },
};
</script>

<style scope lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.song {
  @include bg_sub_color();
  .song-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    padding: 0 20px;
    @include bg_sub_color();
    border-bottom: 1px solid #fff;
    h3 {
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
    }
  }
}
</style>