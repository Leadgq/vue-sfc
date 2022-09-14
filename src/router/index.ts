import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/async',
        name: 'async',
        component: () => import("@/views/async.vue")
    },
    {
        path: '/map',
        name: 'map',
        component: () => import("@/views/map.vue")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/login.vue")
    },
    {
        path: '/',
        component: () => import("@/views/login.vue")
    },
    {
        "path": '/404',
        component: () => import("@/views/404.vue")
    },
    {
        redirect: '/404',
        path: '/:pathMatch(.*)/',
        children: [],
        component: () => import("@/views/404.vue")
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;