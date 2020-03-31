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
            <li class="group-item" v-for="obj in list[index]" :key="obj.id">
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
        @click="keyDown(index)"
        :class="{ active: currentIndex === index }"
      >
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getAllArtists } from "../api/index";
import ScrollView from "../components/ScrollView";

export default {
  name: "Singer",
  data() {
    return {
      keys: [],
      list: [],
      groupTops: [],
      // 当前选中的字母序号
      currentIndex: 0
    };
  },
  components: {
    ScrollView
  },
  mounted() {
    getAllArtists()
      .then(result => {
        this.keys = result.keys;
        this.list = result.list;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    keyDown(index) {
      let offsetY = this.groupTops[index];
      this.$refs.scrollView.scrollTo(0, -offsetY, 200);
      this.currentIndex = index;
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
}
</style>
