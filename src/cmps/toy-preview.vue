
<template>
    <section class="header">
        <input type="checkbox" :checked="toy.isChecked" @change="onCheck" />
        <span>{{ toy.name }}</span>
        <router-link :to="'/toy/' + toy._id">
            <button>Details</button>
        </router-link>
        <router-link :to="'/toy/edit/' + toy._id">
            <button>Edit</button>
        </router-link>
        <button @click="onDelete">delete</button>
    </section>
</template>

<script>
import { eventBus } from '../services/event-bus.service.js'

export default {
    // update props to new way of doing it.
    props: ['toy'],
    methods: {
        onDelete() {
            this.$emit('onDelete', this.toy._id)
        },
        onCheck() {
            const toy = JSON.parse(JSON.stringify(this.toy))
            toy.isChecked = !toy.isChecked
            eventBus.emit('onCheck', toy)
        }
    },
}
</script>
   
