import {http} from "@/plugin/http/axios"
import {registerUserType, userInfoResponseType} from "@/types/userStoreType"
//获取用户信息
export const getUseInfo = () => {
    const url = `/getUserInfo`
    return http.request<userInfoResponseType>({
        method: 'get',
        url,
    })
}
//注册
export const registerUser = (data: registerUserType) => {
    return http.request<userInfoResponseType>({
        method: 'post',
        url: '/registerUser',
        data
    })
}
// 获取用户权限
export const getUserInfoPromises = () => {
    return http.request<string[]>({
        method: 'get',
        url: '/getUserInfoPromises',
    })
}
