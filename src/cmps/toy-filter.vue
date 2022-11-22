
<template>
    <section class="filter">
        <h3>filter</h3>
        <div>
            <label for="">Name</label>
            <input @input="setFilter" v-model=filterBy.name type="text" />
        </div>

        <label for="">Labels</label>
        <select @input="setFilter" v-model="filterBy.labels" multiple>
            <option value="On wheels">On wheels</option>
            <option value="Box game">Box game</option>
            <option value="Art">Art</option>
            <option value="Baby">Baby</option>
        </select>
        <div>
            <label>
                Show only toys in stock
                <input @input="setFilter" v-model="filterBy.inStock" type="checkbox" />
            </label>
        </div>

        <div>
            <label for="">Sort by:</label>
            <select @input="setFilter" v-model="filterBy.sortBy">
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Date</option>
            </select>
        </div>
    
    </section>
</template>

<script>
import { eventBus } from "../services/event-bus.service.js"
import { utilService } from '../services/util.service.js'

export default {
    data() {
        return {
            filterBy: {
                name: '',
                labels: [],
                sort: 'name',
                inStock: false,
                sortBy: false
            }
        }
    },
    created() {
        this.setFilter = utilService.debounce(() => {
            const filterBy = this.filterBy
            this.$emit('setFilter', filterBy)
        }, 500)
    },

}
</script>
   