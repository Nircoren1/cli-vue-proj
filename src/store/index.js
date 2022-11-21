import { createStore } from 'vuex'
import toyModule from "./modules/toy.store.js"

const store = createStore({
    strict: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        toyModule,
    }
})

export default store


