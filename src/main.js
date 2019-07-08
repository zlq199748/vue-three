import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import store from './vuex/store'
import ajax from './api/ajax'
Vue.prototype.$ajax=ajax
Vue.component('Header',Header)
Vue.component('Star',Star)
new Vue({
    el:'#app',
    components:{
        App
     },
    template: '<App/>',
    router,
    store
})
