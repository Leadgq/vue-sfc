import { RouteRecordRaw } from "vue-router";

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
      path:'/component-sfc',
      name:'sfc',
      component: ()=> import("@/views/component-sfc.vue")
    },
    {
        path:'/entrance',
        name:'entrance',
        component: ()=> import("@/views/sfc/entrance.vue")
    }
] as RouteRecordRaw[]
