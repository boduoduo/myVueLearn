import Vue from 'vue'
import Loading from './loading'

export default {
  install: function (vue, options) {
    Vue.component(Loading.name, Loading)
    Vue.showLoading = function () {
      // console.log(options)
      Loading.isShow = true
    }
    Vue.hideLoading = function () {
      console.log(options)
      Loading.isShow = false
    }
  }
}
