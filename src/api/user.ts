import { http } from "@/plugin/http/axios"
import { userInfoResponseType, userRequestType, registerUserType } from "@/types/userStoreType"
//获取用户信息
export const getUseInfo = (params: userRequestType) => {
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