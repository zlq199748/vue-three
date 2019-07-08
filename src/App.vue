<template>
  <div>
    <router-view/>
    <FooterGuide v-show="$route.meta.isShow"/>
  </div>

</template>
<script>
 import FooterGuide from '../src/components/FooterGuide/FooterGuide.vue'
export default{
   async mounted(){
     this.$store.dispatch('getAddress')
   },
  components:{
    FooterGuide
  },

 }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
