export type userInfoResponseType = {
    name: number | string | undefined;
    age: number | string | undefined;
    token: string;
    id: number | string | undefined;
}
export type userRequestType = {
    id: number | string
}
export type registerUserType = {
    name: string,
    id: number | string
}
