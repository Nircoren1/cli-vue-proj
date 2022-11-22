
<template>
    <section class="header">
        <h5>{{ toy.name }} </h5>
        <h5> {{ toy.price }}</h5>
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
    props: {
        toy: {
            type: Array,
            required: true,
        }
    },
    methods: {
        onDelete() {
            this.$emit('onDelete', this.toy._id)
        },
    },
}
</script>
   
