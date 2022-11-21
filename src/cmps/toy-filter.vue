
<template>
    <header class="filter">
        <h3>filter</h3>
        <form ref="filterForm" @submit.prevent="onFilter()">
            <input ref="textFilter" type="text" name="textFilter" />
            <fieldset>
                <input type="radio" id="All" name="filteredToysType" value="All">
                <label for="All">All</label><br>
                <input type="radio" id="Active" name="filteredToysType" value="Active">
                <label for="Active">Active</label><br>
                <input type="radio" id="Done" name="filteredToysType" value="Done">
                <label for="Done">Done</label>
            </fieldset>
            <button>filter</button>
        </form>
    </header>
</template>

<script>
import { eventBus } from "../services/event-bus.service.js"
import { utilService } from '../services/util.service.js'

export default {
    created() {
        this.onFilter = utilService.debounce(() => {
            const textFilter = this.$refs.filterForm.textFilter.value
            const typeFilter = this.$refs.filterForm.filteredToysType.value
            eventBus.emit('onFilter', { textFilter, typeFilter })
        }, 1500)
    },
}
</script>
   