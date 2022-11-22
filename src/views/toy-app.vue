
<template>
    <section>
        <toy-filter @setFilter="setFilter" />
        <router-link to="/toy/edit">Add new toy</router-link>
        <toy-list v-if="toysForDisplay" :toys="toysForDisplay" @onDelete="onDelete" />
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
        this.prefrences = this.$store.getters.getUserPrefrences
    },
    methods: {
        onDelete(toyId) {
            this.$store.dispatch({ type: 'removeToy', toyId })
                .then((toyId) => showSuccessMsg(`${toyId} was deleted`))
                .catch((toyId) => showErrorMsg(`Delete failed`))
        },
        setFilter(filterBy) {
            this.$store.dispatch({ type: 'setFilter', filterBy })
        },
    },
    computed: {
        toysForDisplay() {            
            return this.$store.getters.toysForDisplay
        }
    },
    components: {
        toyList,
        toyFilter
    }
}
</script>
   