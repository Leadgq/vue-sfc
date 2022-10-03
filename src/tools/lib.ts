import fileSaver from 'file-saver'
import { Ref } from "vue";
// 千分符
export const toLocalString = (num: number | string) => typeof num === 'string' ? Number(num).toLocaleString() : num.toLocaleString()
// 返回当前时间
export const currentTime = computed(() => getCurrentTime());
// 获取当前时间
const getCurrentTime = (): string => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const mini = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${mini}:${seconds}`;
}
// 下载文件
export const downloadFile = (url: string | Blob, name: string) => {
    fileSaver.saveAs(url, name);
}
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
const initWebWorker = (): Promise<Worker> => {
    return new Promise((resolve) => {
        const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
        resolve(worker);
    })
}
// 是否是一个可用数组
export const isAvailableArray = (arr: any[] | Ref<any[]>) => arr && Array.isArray(unref(arr)) && unref(arr).length > 0;
// 是否是一个空对象
export const checkObjectNotEmpty = (obj: Record<string, any> | Ref<Record<string, any>>) => Reflect.ownKeys(unref(obj)).length === 0 && unref(obj).constructor === Object;
// 求和
export const sum = (num1: number | Ref<number>, num2: number | Ref<number>) => unref(num1) + unref(num2);
// 压平数组
export const flatten = (arr: any[] | Ref<any[]>): any[] => {
    return unref(arr).reduce((prev, cur) => {
        const { children } = cur;
        return isAvailableArray(children) ? prev.concat(flatten(children), { ...cur }) : prev.concat({ ...cur })
    }, [])
}