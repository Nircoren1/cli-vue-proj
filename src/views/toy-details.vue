<template>
    <header class="header" v-if="toy">
        <h1>{{ toy.txt }}</h1>
        <h1>{{ toy._id }}</h1>
    </header>
</template>

<script>
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
            this.toy = this.$store.state.currToy
        }
    },
}
</script>