import { getUseInfo } from '@/api/user';
import { defineStore } from "pinia"
import { userInfoResponseType } from "@/types/userStoreType"

const userStore = defineStore('userStore', {
    state: () => {
        return {
            userInfo: <userInfoResponseType>{
                name: undefined,
                age: undefined,
                token: '',
                id: undefined
            }
        }
    },
    getters: {
        userInfoValue(): userInfoResponseType {
            return this.userInfo;
        }
    },
    actions: {
        async getUseInfoAction(id: string | number) {
            let res = await getUseInfo({ id });
            this.userInfo = res.result;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user_info',
                storage: localStorage,
                paths: ['userInfo']
            }
        ]
    }
})

export default userStore;