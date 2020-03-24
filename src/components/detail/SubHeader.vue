<template>
  <div class="header" @click="changeTheme">
      <div class="header-left" @click.stop="back"></div>
      <div class="header-title">{{title}}</div>
      <div class="header-right"></div>
  </div>
</template>

<script>
export default {
    name: 'SubHeader',
    data() {
        return {
            themes: ["theme","theme1","theme2"],
            index: 0,
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
        }
    },
    props: {
        title: {
            type: String,
            default: '',
            required: true
        }
    }
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
        text-align: center;
        line-height: 100px;
        color: white;
        font-weight: bold;
        @include font_size($font_medium);
        @include no-wrap();
    }
}

</style>