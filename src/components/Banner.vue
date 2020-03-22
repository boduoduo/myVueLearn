<template>
  <!-- 后面用v-if="banners.length > 0"，是因为swiper有个bug，轮播到最后一页后，不会自动轮播了 -->
  <swiper ref="mySwiper" :options="swiperOptions" class="banner" v-if="banners.length > 0">
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img v-lazy="value.pic" alt />
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "Banner",
  data() {
    return {
      swiperOptions: {
        loop: true, //是否开启轮播
        autoplay: {
          delay: 1000, ///自动切换的时间间隔，单位ms
          stopOnLastSlide: false, ///当切换到最后一个slide时，停止自动切换
          disableOnInteraction: false ///用户操作swiper后，是否禁止autoplay
        },
        pagination: {
          el: ".swiper-pagination"
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  props: {
    banners: {
      type: Array,
      default: [],
      required: true
    }
  }
};
</script>

<style scope lang="scss">
.banner {
  .item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>

<style lang="scss">
// 要修改swiper的样式，style不能是scope的，需要写在全局样式里面
@import "../assets/css/mixin";

.banner {
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background-color: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
  }
}
</style>