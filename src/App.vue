<template>
  <div>
    <keep-alive>
    <router-view/>
    </keep-alive>
    <FooterGuide v-show="$route.meta.isShow"/>
  </div>

</template>
<script>
 import FooterGuide from '../src/components/FooterGuide/FooterGuide.vue'
export default{
   async mounted(){
     //分发action，从后台获取数据到state
     this.$store.dispatch('getAddress')
     this.$store.dispatch('autoLigon')

   },
  components:{
    FooterGuide
  },

 }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
