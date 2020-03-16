import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from './plugins/loading/index'

Vue.use(Loading)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
