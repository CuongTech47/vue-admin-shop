import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)


// admin project pages
import home from './components/pages/Home'
import category from './components/pages/Category'

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
]
export default new Router({
    mode: 'history',
    routes

})