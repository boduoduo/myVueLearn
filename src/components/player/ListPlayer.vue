<template>
  <div class="list-player">
      <div class="player-wrapper">
          <div class="player-top">
              <div class="top-left">
                  <div class="mode"></div>
                  <p>顺序播放</p>
              </div>
              <div class="top-right">
                  <div class="del"></div>
              </div>
          </div>
          <div class="player-middle">
              <ScrollView>
                  <ul>
                      <li class="item">
                          <div class="item-left">
                              <div class="item-play"></div>
                              <p>演员</p>
                          </div>
                          <div class="item-right">
                             <div class="item-favorite"></div> 
                             <div class="item-del"></div>
                          </div>
                      </li>
                  </ul>
              </ScrollView>
          </div>
          <div class="player-bottom"></div>
      </div>
  </div>
</template>

<script>
import ScrollView from '../../components/ScrollView'
export default {
    name: 'ListPlayer',
    components: {
        ScrollView,
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';

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
                @include bg_img('../../assets/images/small_loop')
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
                @include bg_img('../../assets/images/small_del');
            }
        }
    }
    .player-middle {
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;
        }
    }
}
</style>