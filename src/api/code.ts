import {http} from "@/plugin/http/axios";

type CodeType = {
    code: string
}

export const getCodeImg = () => {
    return http.request<CodeType>({
        method: 'get',
        url: '/code'
    })
}
