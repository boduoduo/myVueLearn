<template>
  <div class="container" v-if="isShow">
    <div class="loading"></div>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      title: '正在加载中...',
      isShow: true
    }
  }
}
</script>

<style scope lang="scss">

* {
  margin: 0;
  padding: 0;
}

.container {
  margin: 20px auto;
  width: 200px;
  height: 200px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  border-radius: 20px;
  overflow: hidden;
  .loading {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 8px solid white;
    margin: 20px auto;
    border-right-color: skyblue;
    animation: loading 2s linear infinite;
  }
  .title {
    text-align: center;
    color: white;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}

</style>
