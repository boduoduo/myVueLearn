<template>
  <div class="rank">
    <ScrollView>
      <ul>
        <li v-for="(value, key) in category.titles" :key="key">
          <h3 class="group-title">{{value}}</h3>
          <ul class="normal-group" v-if="value === '官方榜'">
            <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectedItem(obj.id)">
              <div class="rank-left">
                <img v-lazy="obj.rank.coverImgUrl" alt="">
                <p>{{obj.rank.updateFrequency}}</p>
              </div>
              <div class="rank-right">
                <p v-for="(song, index) in obj.rank.tracks" :key="index">{{index+1}}.{{song.first}}-{{song.second}}</p>
              </div>
            </li>
          </ul>
          <ul class="other-group" v-else>
            <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectedItem(obj.id)">
              <div class="rank-top">
                <img v-lazy="obj.rank.coverImgUrl" alt="">
                <p>{{obj.rank.updateFrequency}}</p>
              </div>
              <div class="rank-bottom">
                <p>{{obj.rank.name}}</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <router-view></router-view>
  </div>
</template>

<script>

import { getTopListDetail } from '../api/index'
import ScrollView from '../components/ScrollView'
import Vue from 'vue'

export default {
    name: 'Rank',
    data() {
      return {
        category: {}
      }
    },

    components: {
      ScrollView
    },

    created() {
      Vue.showLoading()
      getTopListDetail()
      .then(data => {
        Vue.hiddenLoading()
        this.category = data
      })
      .catch(err => {
        Vue.hiddenLoading()
        console.log(err)
      })
    },

    methods: {
      selectedItem (id) {
        this.$router.push(`/rank/detail/${id}/rank`)
      }
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable';
@import '../assets/css/mixin';
.rank {
  position: fixed;
  left: 0;
  top: 184px;
  right: 0;
  bottom: 0;
  overflow: hidden;
  @include bg_sub_color();
  .group-title {
    padding: 10px 20px;
    @include font_color();
    @include font_size($font_large);
    font-weight: bold;
  }
  .normal-group {
    li {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      box-sizing: border-box;
      .rank-left {
        position: relative;
        img {
          width: 200px;
          height: 200px;
          border-radius: 10px;
        }
        p {
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: white;
          @include font_size($font_medium_s);
        }
      }
      .rank-right {
        margin-left: 20px;
        p {
          @include font_color();
          @include font_size($font_medium_s);
          padding: 10px 0;
        }
      }
    }
  }
  .other-group {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      padding: 10px 20px;
      box-sizing: border-box;
      .rank-top {
        position: relative;
        img {
          width: 200px;
          height: 200px;
          border-radius: 10px;
        }
        p {
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: white;
          @include font_size($font_medium_s);
        }
      }
      .rank-bottom {
        width: 200px;
        @include no_wrap();
        p {
          @include font_color();
          @include font_size($font_medium_s);
          padding: 10px 0;
        }
      }
    }
  }
}
</style>