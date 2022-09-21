// 用户响应
export type userInfoResponseType = {
    name: number | string | undefined;
    age: number  | undefined;
    token: string;
    id: number | string | undefined;
}
// 请求登录参数
export type userRequestType = {
    id: number | string
}
// 请求注册参数
export type registerUserType = {
    name: string,
    id: number | string
}
