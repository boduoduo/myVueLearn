<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="banner">
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="cdWrapper">
        <img :src="currentSong.picUrl" alt />
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <li
            v-for="(value, key) in currentLyric"
            :key="key"
            :class="{'active' : currentKey === key}"
          >{{value}}</li>
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
import { mapGetters } from "vuex";

export default {
  name: "PlayerMiddle",
  data() {
    return {
      currentKey: "0",
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

  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },

  created() {},

  components: {
    swiper,
    swiperSlide,
    ScrollView
  },

  computed: {
    ...mapGetters(["isPlaying", "currentSong", "currentLyric"])
  },

  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWrapper.classList.add("active");
      } else {
        this.$refs.cdWrapper.classList.remove("active");
      }
    },

    currentTime(newValue, oldValue) {
      // 高亮歌词同步
      let lineNum = Math.floor(newValue)
      this.currentKey = this.getActiveLineNum(lineNum);
      // 歌词滚动同步
      let currentLyricTop = document.querySelector("li.active").offsetTop;
      let lyricHeight = this.$refs.lyric.$el.offsetHeight;
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.scrollView.scrollTo(
          0,
          lyricHeight / 2 - currentLyricTop,
          200
        );
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 200);
      }
    },

    currentLyric (newValue, oldValue) {
      for (const key in newValue) {
        this.currentKey = key
        return
      }
    }
  },

  methods: {
    getFirstLyric() {
      for (const key in this.currentLyric) {
        return this.currentLyric[key];
      }
    },

    getActiveLineNum(lineNum) {
      if (lineNum <= 0) {
        return this.currentKey
      }
      let result = this.currentLyric[lineNum + ""];
      if (result === undefined || result === "") {
        lineNum--;
        return this.getActiveLineNum(lineNum);
      } else {
        return lineNum + "";
      }
    }
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
      animation: sport 8s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
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
      margin: 10px 0;
      @include font_color();
      @include font_size($font_medium);
      &:last-of-type {
        padding-bottom: 52%;
      }
      &.active {
        color: white;
      }
    }
  }

  @keyframes sport {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
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
