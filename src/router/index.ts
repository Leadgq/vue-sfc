import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Guard from "@/router/Guard"
import BaseRouters from "@/router/baseRouters";
import {handlerRouter} from "@/router/options";
// 额外声明路由元信息
declare module "vue-router" {
    interface RouteMeta {
        title?: string
        // 权限
        permissions?: string[],
    }
}
const routes = [
    {
        path: '/async',
        name: 'async',
        component: () => import("@/views/async.vue"),
        children: [
            {
                path: 'async_children',
                name: 'async_children',
                meta: {permissions: ' '},
                component: () => import("@/components/asyncChildren.vue"),
            }
        ]
    },
    {
        path: '/map',
        name: 'map',
        component: () => import("@/views/map.vue")
    },
] as RouteRecordRaw[]
const router = createRouter({
    history: createWebHistory(),
    routes: [...BaseRouters, ...handlerRouter(routes)],
})
new Guard(router);
export default router;
