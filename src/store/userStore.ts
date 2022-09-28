import {getUserInfoPromises, login} from '@/api/user';
import {defineStore} from "pinia"
import {loginUserType, userInfoResponseType} from "@/types/userStoreType"

const userStore = defineStore('userStore', {
    state: () => {
        return {
            userInfo: <userInfoResponseType>{},
            userPromises: [] as string[]
        }
    },
    getters: {
        userInfoValue(): userInfoResponseType {
            return this.userInfo;
        },
        userPromisesInfo(): string[] {
            return this.userPromises;
        }
    },
    actions: {
        async loginRequest(data: loginUserType) {
            let res = await login(data);
            this.userInfo = res.result;
        },
        async getUserInfoPromise() {
            const data = await getUserInfoPromises();
            this.userPromises = data.result;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user_info',
                storage: localStorage,
                paths: ['userInfo', 'userPromises']
            }
        ]
    }
})

export default userStore;
