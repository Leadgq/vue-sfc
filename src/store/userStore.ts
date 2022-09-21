import {getUseInfo, getUserInfoPromises} from '@/api/user';
import {defineStore} from "pinia"
import {userInfoResponseType} from "@/types/userStoreType"


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
        }
    },
    actions: {
        async getUseInfoAction(id: string | number) {
            let res = await getUseInfo({id});
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
