import { toyService } from "../../services/toy.service.js"

export default {
    strict: true,
    state() {
        return {
            toys: null,
            currToy: null,
            filterBy: {
                name:'',
                labels: [],
                sort: 'name',
                inStock: false,
            },
        }
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
        setCurrToy(state, { id }) {
            state.currToy = state.toys.find(toy => toy._id === id)
        },
        saveToy(state, { savedToy }) {
            const idx = state.toys.findIndex(toy => toy._id === savedToy._id)
            if (idx >= 0) state.toys.splice(idx, 1, savedToy)
            else state.toys.push(savedToy)
        },
        removeToy(state, { toyId }) {
            const idx = state.toys.findIndex(toy => toy._id === toyId)
            state.toys.splice(idx, 1)
        },
    },
    getters: {
        currToy({ currToy }) {
            return currToy
        },
        toysForDisplay({toys}){
            return toys
        }
    },
    actions: {
        loadToys({ commit, state }) {
            toyService.query(state.filterBy).then((toys) => {
                commit({ type: 'setToys', toys })
            })
        },
        removeToy(context, { toyId }) {
            return toyService.remove(toyId).then(() => {
                context.commit({ type: 'removeToy', toyId })
                return toyId
            })
        },
        saveToy(context, { toy }) {
            return toyService.save(toy).then((savedToy) => {
                context.commit({ type: 'saveToy', savedToy })
                return savedToy
            })
        },
        toyChecked(context, { toy }) {
            toyService.save(toy)
                .then(savedToy => context.commit({ type: 'saveToy', savedToy }))
        },
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy })
            dispatch({ type: 'loadToys' })
        },
    }
}

