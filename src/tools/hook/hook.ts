import userStore from "@/store/userStore";
import {loginUserType} from "@/types/userStoreType";
import router from "@/router";
import {FormInstance} from 'element-plus'

export const useLogin = () => {
    const loginData = reactive<loginUserType>({
        name: "",
        password: "",
        phone: "",
        code: ''
    })
    const userStoreInstance = userStore();
    const login = async (ruleFormRef: FormInstance) => {
        await ruleFormRef.validate((valid: boolean) => {
            if (valid) {
                pathAction();
            }
        })
    };
    const pathAction = async () => {
        // 请求登录
        await userStoreInstance.loginRequest(loginData);
        // 获取用户权限
        await userStoreInstance.getUserInfoPromise();
        // 路由跳转
        await router.push({path: '/async/async_children2'})
    }
    return {
        login,
        loginData
    }
}
