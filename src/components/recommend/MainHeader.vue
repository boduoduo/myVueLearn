<template>
  <Header class="header">
    <div class="header-left" slot="left"></div>
    <div class="header-title" slot="center">网易云音乐</div>
    <div class="header-right" slot="right" @click.stop="accountClicked"></div>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'MainHeader',
  components: {
    Header,
  },
  methods: {
    accountClicked () {
      this.$router.push('/account')
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header {
  .header-left {
    @include bg_img('../../assets/images/logo');
  }
  .header-right {
    @include bg_img('../../assets/images/account');
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: white;
    font-weight: bold;
    @include font_size($font_medium)
  }
}
</style>