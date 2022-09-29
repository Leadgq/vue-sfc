import userStore from "@/store/userStore";
import {loginUserType} from "@/types/userStoreType";
import router from "@/router";
import {FormInstance} from 'element-plus'

export const loginHook = () => {
    const storeInstance = userStore();
    const login = async (data: loginUserType, ruleFormRef: FormInstance) => {
        await ruleFormRef.validate((valid: boolean) => {
            if (valid) {
                pathAction(data);
            }
        })
    };
    const pathAction = async (data: loginUserType) => {
        await storeInstance.loginRequest(data);
        await storeInstance.getUserInfoPromise();
        await router.push({path: '/async/async_children2'})
    }
    return {
        login
    }
}
