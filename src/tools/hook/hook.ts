import userStore from "@/store/userStore";
import {loginUserType} from "@/types/userStoreType";
import router from "@/router";
import {FormInstance} from 'element-plus'

export const loginHook = () => {
    const userStoreInstance = userStore();
    const login = async (data: loginUserType, ruleFormRef: FormInstance) => {
        await ruleFormRef.validate((valid: boolean) => {
            if (valid) {
                pathAction(data);
            }
        })
    };
    const pathAction = async (data: loginUserType) => {
        // 请求登录
        await userStoreInstance.loginRequest(data);
        // 获取用户权限
        await userStoreInstance.getUserInfoPromise();
        // 路由跳转
        await router.push({path: '/async/async_children2'})
    }
    return {
        login
    }
}
