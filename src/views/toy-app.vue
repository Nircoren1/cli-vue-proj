
<template>
    <section>
        <toy-filter @setFilter="setFilter" />
        <router-link to="/toy/edit">Add new toy</router-link>
        <toy-list v-if="toysForDisplay" :toys="toysForDisplay" @onDelete="onDelete" />
    </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import toyList from '../cmps/toy-list.vue'
import toyFilter from '../cmps/toy-filter.vue'

export default {
    methods: {
        onDelete(toyId) {
            this.$store.dispatch({ type: 'removeToy', toyId })
                .then((toyId) => showSuccessMsg(`${toyId} was deleted`))
                .catch((err) => showErrorMsg(`Delete failed`))
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
   