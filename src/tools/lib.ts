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

export const loadFile = async () => {
    const module = import.meta.glob("../mock/AQYD.ts");
    let moduleData = {};
    let data = await Object.values(module)[0]() as Record<string, any>;
    if (data) {
        moduleData = data.default;
    }
    return moduleData;
}
