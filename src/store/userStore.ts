import {getUserInfoPromises, login} from '@/api/user';
import {defineStore} from "pinia"
import {loginUserType, userInfoResponseType} from "@/types/userStoreType"
import util from "@/tools/help/help"

const userStore = defineStore('userStore', {
    state: () => {
        return {
            userInfo: <userInfoResponseType>{},
            userPromises: [] as string[],
            expire: undefined as undefined | number
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
            Object.assign(this.userInfo, res.result)
            const {expire} = res.result;
            if (expire) {
                this.userInfo.expire = util.set(expire);
            }
        },
        async getUserInfoPromise() {
            const data = await getUserInfoPromises();
            this.userPromises = data.result;
        },
        // 修改过期时间
        modifyExpire(expire: number) {
            this.expire = expire;
        },
        // 检查过期时间
        checkExpire() {
            if (this.expire) return this.expire < Date.now();
        },
        // 修改用户状态 ==>只有设置过期时间
        modifyUserState() {
            this.userInfo = {} as userInfoResponseType;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user_info',
                storage: localStorage,
                paths: ['userInfo']
            },
            {
                key: 'user_promises',
                storage: localStorage,
                paths: ['userPromises']
            }
        ]
    }
})

export default userStore;
