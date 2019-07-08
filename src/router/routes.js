import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
export default [
    {
        path: '/msite',
        component: MSite,
        meta: {
          isShow: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
          isShow: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
          isShow: true
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
          isShow: true
        }
    },
    {
        path: '/',
        redirect: '/msite',
    },
    {
      path:'/login',
      component:Login
    }
]
