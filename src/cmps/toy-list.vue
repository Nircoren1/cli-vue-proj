
<template>
    <section>
        <div v-if="!toys.length">loading...</div>
        <div v-else v-for="toy in toys" :key="toy._id">
            <toy-preview :toy="toy" @onDelete="onDelete" />
        </div>
    </section>
</template>

<script>
import toyPreview from './toy-preview.vue'

export default {
    props: ['toys'],
    template: `
        
    `,
    methods: {
        onDelete(toyId) {
            this.$emit('onDelete', toyId)
        }
    },
    components: {
        toyPreview,
    }
}
</script>
