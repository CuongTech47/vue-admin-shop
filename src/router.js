import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)


// admin project pages
import home from './components/pages/Home'
import category from './components/pages/Category'
import brand from './components/pages/Brand'
const routes = [
    {
        path: '/',
        component: home,
        name: 'home'

    },
    {
        path: '/category',
        component: category,
        name: 'category'

    },
    {
        path: '/brand',
        component: brand,
        name: 'brand'

    },
]
export default new Router({
    mode: 'history',
    routes

})