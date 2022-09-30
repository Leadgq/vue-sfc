import {NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router"
import UserStore from "@/store/userStore"

class Guard {
    protected router: Router;

    constructor(router: Router) {
        this.router = router;
        this.run();
    }

    protected run() {
        this.router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            if (!to.fullPath.includes('login') && !this.isLogin()) {
                next({name: 'login'});
            } else {
                next();
            }
        })
    }

    protected isLogin() {
        const store = UserStore();
        if (store.checkExpire()) {
            store.modifyUserState();
        }
        return store.userInfoValue.token;
    }
}


export default Guard
