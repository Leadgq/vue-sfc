import fileSaver from 'file-saver'
import {Ref} from "vue";
// 千分符
export const toThousands = (num: number | string | Ref<string | number>) => typeof unref(num) === 'string' ? Number(unref(num)).toLocaleString() : unref(num).toLocaleString();
// 下载文件
export const downloadFile = (url: string | Blob | Ref<string | Blob>, name: string | Ref<string>) => fileSaver.saveAs(unref(url), unref(name));
// 是否是一个可用数组
export const isAvailableArray = (arr: any[] | Ref<any[]>) => arr && Array.isArray(unref(arr)) && unref(arr).length > 0;
// 是否是一个可用对象
export const isAvailableObject = (obj: Record<string, any> | Ref<Record<string, any>>) => Reflect.ownKeys(unref(obj)).length !== 0 && unref(obj).constructor === Object;
// 对象中所有项是否都有值
export const isAvailableObjectValue = (obj: Record<string, any> | Ref<Record<string, any>>) => isAvailableObject(obj) && Object.values(unref(obj)).every(item => item);
// 是否是一个可用的手机号
export const isAvailablePhone = (phone: string | Ref<string>) => /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(unref(phone))
// 是否是一个可用的邮箱
export const isAvailableEmail = (email: string | Ref<string>) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(unref(email))
// 是否是一个可用的身份证号码
export const isAvailableIdCard = (idCard: string | Ref<string>) => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(unref(idCard))
// 生成随机数不包括最大值
export const randomMax = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);
// 生成随机数包括最大值
export const randomIncludeMax = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
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
