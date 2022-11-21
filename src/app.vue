
<template>
  <section>
    <app-header/>
    <router-view/>
  </section>
</template>


<script>
import appHeader from './cmps/app-header.vue'

export default {

  name: 'app',
  components:{
    appHeader
  }
}
</script>