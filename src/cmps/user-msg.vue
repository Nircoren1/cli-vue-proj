
<template>
    <div v-if="alive" class="alert" :class="alertClass">
        {{ msg.txt }}
    </div>
</template>

<script>
import { eventBus } from '../services/event-bus.service.js'

export default {
    data() {
        return {
            alive: false,
            msg: null
        }
    },
    created() {
        eventBus.on('show-msg', msg => {
            this.msg = msg
            var delay = msg.delay || 2000
            this.alive = true
            setTimeout(() => {
                this.alive = false
            }, delay)
        })
    },
    computed: {
        alertClass() {
            if (!this.msg) return
            return `alert-${this.msg.type}`
        }
    }
}
</script>
   
}