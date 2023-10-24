import Vuex from 'vuex'
import Vue from 'vue'
import USERMODULE from './userModule'
export const strict = false
Vue.use(Vuex)
new Vuex.Store({
    module: {
        user: USERMODULE
    }
})