import {RouteRecordRaw} from "vue-router";

export const workRoutes = [
    {
        path: '/async',
        name: 'async',
        component: () => import("@/views/async.vue"),
        children: [
            {
                path: 'async_children',
                name: 'async_children',
                meta: {
                    transitionEnter: 'animate__fadeIn',
                    transitionLeave: 'animate__out',
                },
                component: () => import("@/components/asyncChildren.vue"),
            },
            {
                path: 'async_children2',
                name: 'async_children2',
                meta: {
                    transitionEnter: 'animate__fadeIn',
                    transitionLeave: 'animate__out',
                },
                component: () => import("@/components/asyncChildren2.vue"),
            }
        ]
    },
    {
        path: '/map',
        name: 'map',
        component: () => import("@/views/map.vue")
    },
    {
        path: '/aMap',
        name: 'aMap',
        component:()=> import("@/views/aMap.vue")
    }
] as RouteRecordRaw[]
