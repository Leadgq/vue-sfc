import { RouteRecordRaw} from 'vue-router'

const  baseRouters =[
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
] as RouteRecordRaw[];


export  default baseRouters ;
