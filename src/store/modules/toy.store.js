import { toyService } from "../../services/toy.service.js"

export default {
    strict: true,
    state() {
        return {
            toys: [],
            currToy: null,
            filterBy: {
                typelFilter: 'All',
                textFilter: '',
            },
        }
    },

    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        filterToys(state, { filterBy }) {
            state.filterBy = { ...filterBy }
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
        getProgress({ toys }) {
            const checkedToysCount = toys.reduce((acc, toy) => {
                if (toy.isChecked) return acc + 1
                else return acc
            }, 0)
            return checkedToysCount / toys.length * 100
        },
        getToysForDisplay({ toys, filterBy }) {
            const { typeFilter, textFilter } = filterBy
            return toys.filter(toy => {
                let showToy = true
                if (typeFilter === 'Done') {
                    showToy = toy.isChecked
                } else if (typeFilter === 'Active') {
                    showToy = !toy.isChecked
                }
                return toy.name.toLowerCase().includes(textFilter.toLowerCase()) && showToy
            })
        },
        getCurrToy({ currToy }) {
            return currToy
        }
    },
    actions: {
        loadToys(context) {
            toyService.query().then(toys => {
                context.commit({ type: 'setToys', toys })
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
    }
}

