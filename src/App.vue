<template>
  <div id="app">
    <Header :title="'网易云音乐'"></Header>
    <Tabbar></Tabbar>
    <router-view></router-view>
    <Player></Player>
  </div>
</template>

<script>
import Header from './components/Header'
import Tabbar from './components/Tabbar'
import Player from './views/Player'

export default {
  name: "App",
  data() {
    return {
      msg: "maxb"
    };
  },
  components: {
    Header,
    Tabbar,
    Player
  },

  methods: {
    myFn(data) {
      document.documentElement.setAttribute("data-theme", data)
    }
  }
};
</script>

<style scoped lang="scss">
@import "./assets/css/variable";

.theme {
  position: fixed;
  display: flex;
  left: 0;
  bottom: 0;
  button {
    width: 100px;
    height: 100px;
    &:nth-of-type(1) {
      background: $background-color-theme;
    }
    &:nth-of-type(2) {
      background: $background-color-theme1;
    }
    &:nth-of-type(3) {
      background: $background-color-theme2;
    }
  }
}
</style>
