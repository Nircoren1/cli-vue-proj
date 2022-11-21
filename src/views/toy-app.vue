
<template>
    <section >
        <toy-filter />
        <router-link to="/toy/edit">Add new toy</router-link>
        <toy-list :toys="getToysForDisplay" @onDelete="onDelete" />
    </section>
</template>

<script>
import { eventBus } from '../services/event-bus.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import toyList from '../cmps/toy-list.vue'
import toyFilter from '../cmps/toy-filter.vue'

export default {
    data() {
        return {
            prefrences: null
        }
    },
    created() {
        this.$store.dispatch({ type: 'loadToys' })
        //need to fix this. event bus calls itself multiple times 
        eventBus.on('onCheck', (toy) => {
            this.$store.dispatch({ type: 'toyChecked', toy })
        })
        eventBus.on('onFilter', (filterBy) => {
            this.$store.commit({ type: 'filterToys', filterBy })
        })
        this.prefrences = this.$store.getters.getUserPrefrences
    },
    methods: {
        onDelete(toyId) {
            this.$store.dispatch({ type: 'removeToy', toyId })
                .then((toyId) => showSuccessMsg(`${toyId} was deleted`))
                .catch((toyId) => showErrorMsg(`Delete failed`))
        }
    },
    computed: {
        getToysForDisplay() {
            return this.$store.getters.getToysForDisplay
        }
    },
    components: {
        toyList,
        toyFilter
    }
}
</script>
   