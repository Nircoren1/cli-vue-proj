<template>
    <section>
        <form v-if="toyToEdit">
            <div>
                <label>Name</label>
                <input type="text" v-model="toyToEdit.name" />
            </div>
            <div>
                <label for="">Price</label>
                <input type="number" v-model="toyToEdit.price" />
            </div>
            <div>
                <label for="">Labels</label>
                <ul>
                    <li v-for="label in labels">
                        <input type="checkbox" :checked="isToyHasLabel(label)" @change="labelChecked(label)">
                        <span>{{ label }}</span>
                    </li>
                </ul>
            </div>
            <div>
                <label for="">In stock?</label>
                <button @click="inStockBtn(true)">yes</button>
                <button @click="inStockBtn(false)">no</button>
            </div>

            <button @click="save">Save</button>
        </form>

    </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service"
export default {
    data() {
        return {
            toyToEdit: null,
            labels: null,
        }
    },
    created() {
        const { id } = this.$route.params
        this.initLabels()
        if (id) {
            // take it from store not from service.
            toyService.getById(id).then((toy) => {
                this.toyToEdit = JSON.parse(JSON.stringify(toy))
            })
        } else this.toyToEdit = toyService.getEmptyToy()

    },
    methods: {
        initLabels() {
            toyService.getLabels().then(lables => this.labels = lables)
        },
        save() {
            const toy = this.toyToEdit
            const successMsgType = toy._id ? 'Edited' : 'Added'
            const errorMsgType = toy._id ? 'edit' : 'add'
            this.$store.dispatch({ type: 'saveToy', toy })
                .then(() => {
                    showSuccessMsg(`${successMsgType} toy (id: ${toy._id})`)
                })
                .catch((err) => {
                    showErrorMsg(`Cannot ${errorMsgType} toy`)
                })
        },
        isToyHasLabel(label) {
            return this.toyToEdit.labels.includes(label)
        },
        labelChecked(label) {
            const idx = this.toyToEdit.labels.findIndex(toyLabel => toyLabel === label)
            if (idx > -1) {
                this.toyToEdit.labels.splice(idx, 1)
            } else this.toyToEdit.labels.push(label)

        },
        inStockBtn(onStock) {
            let bool = false
            if (onStock) bool = true
            this.toyToEdit.inStock = bool
        }

    },
    computed: {

    }
}

</script>