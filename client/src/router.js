import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: () => import('./pages/Login')
        },
        {
            path: '/register',
            component: () => import('./pages/Register')
        },
        {
            path: '/cms',
            name: 'content-page-list',
            component: () => import('./pages/content/List')
        },
        {
            path: '/cms-add',
            name: 'content-page-add',
            component: () => import('./pages/content/Add')
        },
        {
            path: '/cms/:slug',
            name: 'content-page-edit',
            component: () => import('./pages/content/Edit')
        },
    ]
})