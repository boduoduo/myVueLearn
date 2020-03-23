<template>
  <div class="detail-top">
      <div class="img-container">
          <img :src="path" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name: 'DetailTop',
    props: {
        path: {
            type: String,
            default: '',
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.detail-top {
    .img-container {
        width: 100%;
        height: 500px;
        overflow: hidden;
        position: relative;
        img {
            width: 100%;
        }
    }
}
</style>