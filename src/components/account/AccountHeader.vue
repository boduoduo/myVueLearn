<template>
  <div class="header" @click="changeTheme">
      <div class="header-left" @click.stop="back"></div>
      <div class="header-title">
          <li :class="{'active' : switchNum === 0}" @click.stop="clickTitle(0)">我喜欢的</li>
          <li :class="{'active' : switchNum === 1}" @click.stop="clickTitle(1)">最近听的</li>
      </div>
      <div class="header-right"></div>
  </div>
</template>

<script>
export default {
    name: 'AccountHeader',
    data() {
        return {
            themes: ["theme","theme1","theme2"],
            index: 0,
            switchNum: 0
        }
    },
    methods: {
        changeTheme () {
            this.index++
            if (this.index>=this.themes.length) {
                this.index = 0
            }
            document.documentElement.setAttribute("data-theme", this.themes[this.index])
        },

        back () {
            window.history.back()
        },

        clickTitle (num) {
            this.switchNum = num
            this.$emit('switchNum', num)
        }
    },
}
</script>

<style scoped lang='scss'>

@import '../../assets/css/variable';
@import '../../assets/css/mixin';

.header {
    position: relative;
    z-index: 999;
    width: 100%;
    height: 100px;
    @include bg_color();
    background-color: red;
    display: flex;
    justify-content: space-between;
    .header-left, .header-right {
        width: 84px;
        height: 84px;
        margin-top: 8px;
    }
    .header-left {
        @include bg_img('../../assets/images/back');
    }
    .header-right {
        @include bg_img('../../assets/images/more');
    }
    .header-title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;
        border: 1px solid #fff;
        border-radius: 10px;
        @include font_size($font_medium);
        @include no-wrap();
        height: 60px;
        margin-top: 20px;
        li {
            list-style: none;
            line-height: 60px;
            height: 60px;
            padding: 0 20px;
            &:nth-of-type(1) {
                border-right: 1px solid #fff;
            }
            &.active {
                background-color: rgba($color: white, $alpha: 0.3);
            }
        }
    }
}

</style>