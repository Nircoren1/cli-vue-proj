
<template>
    <section class="header">
        <label>Name</label>
        <input type="text" v-model="toy.name" />
        <button @click="save">Save</button>
    </section>
</template>
<!-- "name": "Talking Doll",
"price": 123,
"labels": ["Doll", "Battery Powered", "Baby"],
 "createdAt": 1631031801011,
"inStock": true  -->
<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export default {
    data() {
        return {
            toy: {
                _id: null,
                name: '',
                price:null,
                labels:null,
                inStock:null,
            },
        }
    },
    created() {
        this.getToy()
    },
    methods: {
        getToy() {
            const currToyId = this.$route.params.id
            if (!currToyId) return
            this.$store.commit({ type: 'setCurrToy', id: currToyId })
            let currToy = this.$store.getters.getCurrToy
            this.toy = JSON.parse(JSON.stringify(currToy))
        },
        save() {
            const toy = this.toy
            const successMsgType = toy._id ? 'Edited' : 'Added'
            const errorMsgType = toy._id ? 'edit' : 'add'
            this.$store.dispatch({ type: 'saveToy', toy })
                .then((savedtoy) => {
                    showSuccessMsg(`${successMsgType} toy (id: ${toy._id})`)
                })
                .catch((err) => {
                    showErrorMsg(`Cannot ${errorMsgType} toy`)
                })
        }
    }
}

</script>