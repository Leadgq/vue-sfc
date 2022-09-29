import {http} from "@/plugin/http/axios";

export const effectTest = (id: number | string) => {
    return http.request<string>({
        method: 'get',
        url: '/effect'
    })
}
