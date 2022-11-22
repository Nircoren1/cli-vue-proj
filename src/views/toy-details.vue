<template>
    <header class="header" v-if="toy">
        <ul>
            <li>id: {{ toy._id }}</li>
            <li>Price: {{ toy.price }}</li>
            <li>Labels: {{ toy.labels }}</li>
            <li>Created at: {{ toy.createdAt }}</li>
            <li>In Stock: {{ toy.inStock }}</li>
        </ul>
        <toy-reviews :toy="toy" />
    </header>
</template>

<script>
import toyReviews from '../cmps/toy-reviews.vue'
export default {
    data() {
        return {
            toy: null,
        }
    },
    created() {
        this.getToy()
    },
    methods: {
        getToy() {
            const currToyId = this.$route.params.id
            this.$store.commit({ type: 'setCurrToy', id: currToyId })
            this.toy = this.$store.getters.currToy
        }
    },
    components: {
        toyReviews,
    }
}
</script>