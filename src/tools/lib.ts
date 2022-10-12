import fileSaver from 'file-saver'
import {Ref} from "vue";
import {TreeData} from "@/types/tree";
// 千分符
export const toThousands = (num: number | string | Ref<string | number>) => typeof unref(num) === 'string' ? Number(unref(num)).toLocaleString() : unref(num).toLocaleString();
// 下载文件
export const downloadFile = (url: string | Blob | Ref<string | Blob>, name: string | Ref<string>) => fileSaver.saveAs(unref(url), unref(name));
// 处理大文件
export const handlerMoreData = async () => {
    const worker = await initWebWorker();
    return new Promise((resolve) => {
        worker.postMessage({
            type: 'handlerData'
        });
        worker.onmessage = (result: Record<string, any>) => {
            resolve(result.data);
        }
    })
}
// 加载文件夹中的数据
export const loadFile = async (fileName: string) => {
    const worker = await initWebWorker();
    return new Promise((resolve) => {
        worker.postMessage({
            type: 'load',
            fileName
        })
        worker.onmessage = (result: Record<string, any>) => {
            resolve(result.data);
        }
    })
}
// 初始化web-worker
const initWebWorker = (): Promise<Worker> => {
    return new Promise((resolve) => {
        const worker = new Worker(new URL('./worker.ts', import.meta.url), {type: 'module'})
        resolve(worker);
    })
}
// 是否是一个可用数组
export const isAvailableArray = (arr: any[] | Ref<any[]>) => arr && Array.isArray(unref(arr)) && unref(arr).length > 0;
// 是否是一个可用对象
export const isAvailableObject = (obj: Record<string, any> | Ref<Record<string, any>>) => Reflect.ownKeys(unref(obj)).length !== 0 && unref(obj).constructor === Object;
// 对象中所有项是否都有值
export const isAvailableObjectValue = (obj: Record<string, any> | Ref<Record<string, any>>) => isAvailableObject(obj) && Object.values(unref(obj)).every(item => item);
// 压平数组
export const flatten = (arr: TreeData[] | Ref<TreeData[]>): TreeData[] => {
    return unref(arr).reduce((prev: TreeData[], cur: TreeData) => {
        const {children} = cur;
        return isAvailableArray(children) ? prev.concat(flatten(children), {...cur}) : prev.concat({...cur})
    }, [])
}
// 寻找某个节点下所有的子节点不包括当前节点
export const findTreeChildrenNode = (arr: TreeData[] | Ref<TreeData[]>, id: string | Ref<string>): TreeData[] => {
    const nodeId = unref(id);
    const flattenList = flatten(arr);
    const nodeList = flatten(flattenList.filter(item => item.key === nodeId));
    return isAvailableArray(nodeList) ? nodeList.filter(item => item.key !== nodeId) : []
}
const toFlatArray = (tree: TreeData[] | Ref<TreeData[]>, parentId?: string): TreeData[] => {
    return unref(tree).reduce((treeArray: TreeData[], cur) => {
        const child = cur.children
        return [
            ...treeArray,
            parentId ? {...cur, parentId} : cur,
            ...(isAvailableArray(child) ? toFlatArray(child, cur.key) : [])]
    }, []);
}
const getIds = (flatArray: TreeData[] | Ref<TreeData[]>, nodeId: string): string[] => {
    let ids = [nodeId]
    let child = unref(flatArray).find(tree => tree.key === nodeId)
    while (child && child.parentId) {
        ids = [child.parentId, ...ids]
        child = unref(flatArray).find(tree => tree.key === child?.parentId)
    }
    return ids.filter(item => item !== nodeId);
}
// 寻找某个节点的父节点
export const findParentNode = (tree: any, nodeId: string): any => {
    return getIds(toFlatArray(tree), nodeId);
}
// 是否是一个可用的手机号
export const isAvailablePhone = (phone: string | Ref<string>) => /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(unref(phone))
// 是否是一个可用的邮箱
export const isAvailableEmail = (email: string | Ref<string>) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(unref(email))
// 是否是一个可用的身份证号码
export const isAvailableIdCard = (idCard: string | Ref<string>) => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(unref(idCard))
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
// 生成随机数不包括最大值
export const randomMax = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);
// 生成随机数包括最大值
export const randomIncludeMax = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
