<template>
  <div id="app">
    <button @click="showLoading">Loading</button>
    <button @click="hideLoading">hideLoading</button>
    <Loading></Loading>
  </div>
</template>

<script>

import Vue from 'vue'

export default {
  name: 'App',
  methods: {
    showLoading () {
      Vue.showLoading()
    },

    hideLoading () {
      Vue.hideLoading()
    }
  }
}

</script>

<style></style>
