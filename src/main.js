import Vue from 'vue'
import App from './App.vue'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import router from './router/index'
import store from './store/index'
import VueLazyload from 'vue-lazyload'
import VConsole from 'vconsole'
import Loading from './plugin/loading/index'

Vue.use(VueLazyload, {
  // 图片的占位图
  loading: require('./assets/images/loading.png')
})

Vue.use(Loading)

const console = new VConsole()
Vue.use(console)

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
