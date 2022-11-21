<template>
    <header class="header">
        <h1>Header</h1>
        <div>
            <!-- <router-link to="/user">user prefrences</router-link> -->
            <br>
            <router-link to="/toy">toys</router-link>
        </div>
        <h3> {{ getUserName }}</h3>
        <span>Progress: </span><progress :value="getDoneToysPrecentege || 0" max="100"> </progress>
    </header>
</template>

<script>
export default {
    computed: {
        getDoneToysPrecentege() {
            return this.$store.getters.getProgress
        },
        getUserName() {
            return this.$store.getters.getUserName
        }
    }
}
</script>
   

