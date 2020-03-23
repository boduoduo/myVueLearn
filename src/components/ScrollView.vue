<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from "iscroll/build/iscroll-probe";
export default {
  name: "ScrollView",
  mounted() {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿的问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    });
    setTimeout(() => {
      this.iscroll.refresh();
    }, 5000);
    // 创建观察者
    let observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh();
    });
    // 高速观察者观察哪些对象
    let config = {
      childList: true, // 观察目标子节点的变化，添加或者删除
      subtree: true, // 默认为false，设置为true， 可以观察后代节点
      attributeFilter: ["height", "offsetHeight"] //观察特定属性
    };
    // 监听那个节点
    observer.observe(this.$refs.wrapper, config);
  },

  methods: {
    // 监听scrollView的滚动事件，给外界使用
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    }
  },
};
</script>

<style scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>