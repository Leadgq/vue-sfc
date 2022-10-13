import {Ref} from "vue";
import {isAvailableArray} from "@/tools/lib";
// 设置cookie
export const setCookie = (key: string | Ref<string>, value: any | Ref, expire: number | Ref<number>) => {
    const d = new Date();
    d.setDate(d.getDate() + unref(expire));
    document.cookie = `${unref(key)}=${unref(value)};expires=${d.toUTCString()}`
}
// 读取cookie
export const getCookie = (key: string | Ref<string>, type?: string) => {
    const cookieStr = decodeURI(document.cookie);
    let cookieValue = '';
    const cookieArray = cookieStr.split(';');
    if (isAvailableArray(cookieArray)) {
        for (let i = 0; i < cookieArray.length; i++) {
            const temp = cookieArray[i].split('=').filter(item => item);
            if (type && type === 'login' && temp[0].trim() === unref(key).slice(0, unref(key).length - 2)) {
                cookieValue = temp[1];
                break
            } else if (!type && temp[0] === unref(key)) {
                cookieValue = temp[1];
                break
            }
        }
    }
    return cookieValue
};
//删除cookie
export const delCookie = (key: string | Ref<string>) => document.cookie = `${encodeURIComponent(unref(key))}=;expires=${new Date()}`
