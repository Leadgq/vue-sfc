import {workRoutes} from "@/router/wokerRoutes"
import router from "@/router"

export const loadRoutes = (): Promise<void> => {
    return new Promise((resolve) => {
        workRoutes.forEach((item) => {
            router.addRoute(item)
        })
        resolve();
    })
}
