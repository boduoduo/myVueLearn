import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    // state 用于保存全局共享的数据
    state: state,
    // 用于保存修改全局共享的数据的方法
    mutations: mutations,
    // 用于保存触发mutations中保存的方法的方法
    actions: actions,

    getters: getters,
    modules: {

    }
})

export default store