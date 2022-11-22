
<template>
  <section>
    <app-header />
    <router-view />
  </section>
</template>


<script>
import appHeader from './cmps/app-header.vue'

export default {

  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadToys' })

  },
  components: {
    appHeader
  }
}
</script>