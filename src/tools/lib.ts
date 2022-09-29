import fileSaver from 'file-saver'
// 千分符
export const toLocalString = (num: number | string) => {
    if (!num) throw new Error('请传入字符串或者数字');
    return typeof num === 'string' ? Number(num).toLocaleString() : num.toLocaleString()
}
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
        worker.postMessage('handlerData');
        worker.onmessage = (result: Record<string, any>) => {
            resolve(result.data);
        }
    })
}
// 加载文件夹中的数据
export const loadFile = async (fileName:string) => {
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
        const worker = new Worker(new URL('./worker.ts', import.meta.url), {type: 'module'})
        resolve(worker);
    })
}
