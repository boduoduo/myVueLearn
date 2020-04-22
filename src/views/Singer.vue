<template>
  <div class="singer">
    <ScrollView ref="scrollView">
      <ul class="list-warpper">
        <li
          class="list-group"
          v-for="(value, index) in keys"
          :key="index"
          ref="group"
        >
          <h3 class="group-title">{{ value }}</h3>
          <ul>
            <li class="group-item" v-for="obj in list[index]" :key="obj.id" @click="gotoSinger(obj.id)">
              <img v-lazy="obj.img1v1Url" alt="" />
              <p>{{ obj.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <ul class="list-key">
      <li
        v-for="(value, index) in keys"
        :key="index"
        :class="{ active: currentIndex === index }"
        @touchstart.stop.prevent="touchstart"
        @touchmove.stop.prevent="touchmove"
        :data-index="index"
      >
        {{ value }}
      </li>
    </ul>
    <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getAllArtists } from "../api/index";
import ScrollView from "../components/ScrollView";
import Vue from 'vue'

export default {
  name: "Singer",
  data() {
    return {
      keys: [],
      list: [],
      groupTops: [],
      // 当前选中的字母序号
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0,    // 当前滚动的偏移位
      fixTitleHeight: 0,
    };
  },
  components: {
    ScrollView
  },

  created() {
    Vue.showLoading()
    getAllArtists()
      .then(result => {
        Vue.hiddenLoading()
        this.keys = result.keys
        this.list = result.list
      })
      .catch(err => {
        Vue.hiddenLoading()
        console.log(err)
      })
  },

  computed: {
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },

  mounted() {
    this.$refs.scrollView.scrolling((y) => {
      this.scrollY = y
      if (y >= 0) {
        this.currentIndex = 0
        return
      }

      for (let i = 0; i < this.groupTops.length; i++) {
        let preTop = this.groupTops[i]
        let nextTop = this.groupTops[i+1]
        if (-y > preTop && -y <= nextTop) {
          this.currentIndex = i
          // 用下一组标题的偏移位 + 当前滚出去的偏移位
          let diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          if (diffOffsetY > 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitleOffsetY = 0
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) {
            return
          }
          this.fixTitleOffsetY = fixTitleOffsetY
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
          return
        }
      }
      // 处理最后一个区域
      this.currentIndex = this.groupTops.length - 1
    })
  },

  methods: {
    _keyDown(index) {
      let offsetY = this.groupTops[index];
      this.$refs.scrollView.scrollTo(0, -offsetY, 200);
      this.currentIndex = index;
    },

    touchstart (e) {
      // console.log(e.target.dataset.index);
      let index = parseInt(e.target.dataset.index)
      this._keyDown(index)
      this.beginOffsetY = e.touches[0].pageY
    },

    touchmove (e) {
      this.moveOffsetY = e.touches[0].pageY
      let offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keyDown(index)
    },

    gotoSinger(id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  },

  watch: {
    list(newValue, oldValue) {
      // watch 只能监听属性值变化，不能监听页面是否已经渲染完成，需要在nextTick，才能捕捉到页面的渲染结果
      this.$nextTick(() => {
        this.$refs.group.forEach(item => {
          this.groupTops.push(item.offsetTop);
        });
      });
    },

    fixTitle () {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/variable";
@import "../assets/css/mixin";

.singer {
  position: fixed;
  left: 0;
  top: 184px;
  bottom: 0;
  right: 0;
  overflow: hidden;
  @include bg_sub_color();
  .list-warpper {
    .list-group {
      .group-title {
        @include bg_color();
        @include font_size($font_medium);
        padding: 10px 20px;
        box-sizing: border-box;
        color: white;
      }
      .group-item {
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #ccc;
        padding: 10px 20px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
        }
        p {
          display: flex;
          align-items: center;
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium);
        }
      }
    }
  }

  .list-key {
    position: fixed;
    right: 0;
    top: 60%;
    transform: translateY(-60%);
    li {
      @include font_size($font_medium_s);
      @include font_color();
      padding: 2px 2px;
      &.active {
        text-shadow: 0 0 10px #000;
      }
    }
  }
  .fix-title {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    padding: 10px 20px;
    box-sizing: border-box;
    color: white;
    @include font_size($font_medium);
    @include bg_color();
  }
}
</style>
