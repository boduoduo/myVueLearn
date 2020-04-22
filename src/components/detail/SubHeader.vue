<template>
  <Header class="header">
      <div class="header-left" slot="left" @click.stop="back"></div>
      <div class="header-title" slot="center">{{title}}</div>
      <div class="header-right" slot="right"></div>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
    name: 'SubHeader',
    components: {
        Header,
    },
    methods: {
        back () {
            let num = 23223.3267
            num.toFixed(2)
            num = parseFloat(num)
            num = num.toLocaleString()
            console.log(num)
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
    z-index: 999;
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