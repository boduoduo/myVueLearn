<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="banner">
    <swiper-slide class="cd">
      <div class="cd-wrapper">
        <img
          src="https://p2.music.126.net/OZUXgQ9GB6bYJyEQ38p0Pw==/109951164746809287.jpg"
          alt=""
        />
      </div>
      <p>adadafakfaf</p>
    </swiper-slide>
    <swiper-slide class="lyric">
      <ScrollView>
        <ul>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
          <li>我是歌词</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import ScrollView from "../../components/ScrollView";

export default {
  name: "PlayerMiddle",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "my-bullet", //需设置.my-bullet样式
          bulletActiveClass: "my-bullet-active" //激活状态的小圆点
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
    ScrollView
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.banner {
  position: fixed;
  top: 150px;
  left: 0;
  right: 0;
  bottom: 250px;
  .cd {
    .cd-wrapper {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 10px solid white;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      @include font_color();
      @include font_size($font_large);
      margin-top: 50px;
    }
  }
  .lyric {
    li {
      text-align: center;
      &:last-of-type {
        padding-bottom: 100px;
      }
    }
  }
}
</style>

<style lang="scss">
@import "../../assets/css/mixin";
.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: white;
  margin: 0 20px;
}

.my-bullet-active {
  @include bg_color();
  width: 60px;
}
</style>
