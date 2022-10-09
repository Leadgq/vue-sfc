import {createRouter, createWebHistory} from 'vue-router'
import Guard from "@/router/Guard"
import BaseRouters from "@/router/baseRouters";
import {App} from "vue";
import {workRoutes} from "@/router/wokerRoutes"
// 额外声明路由元信息
declare module "vue-router" {
    interface RouteMeta {
        title?: string
        // 权限
        permissions?: string,
        // 动画
        transitionEnter?: string,
        transitionLeave?: string,
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [...BaseRouters, ...workRoutes],
})
// 引入路由入口
export const setRouter = (app: App) => {
    new Guard(router);
    app.use(router);
}
export default router;
