import Vue from 'vue'
import Vuex from 'vuex'
import city from './modules/city'
import org from './modules/org'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    modules: {
        city,
        org
    },
    actions: {

    }
})

export default store