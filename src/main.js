import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import store from './vuex/store'
import RatingSelect from './components/RatingSelect/RatingSelect.vue'
import ajax from './api/ajax'
import CartControl from './components/CartControl/CartControl.vue'
import {Button} from 'mint-ui'
import './mock/mockServer'
import './validate'
Vue.prototype.$ajax=ajax
Vue.component('RatingSelect',RatingSelect)
Vue.component('CartControl',CartControl)
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component('mt-button', Button)
new Vue({
    el:'#app',
   render: h => h(App),
    router,
    store
})
