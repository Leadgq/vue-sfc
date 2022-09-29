onmessage = async function (event) {
    if (event.data.type === 'load') {
        const data = await loadFileData(event.data.fileName);
        postMessage(data)
    } else if (event.data.type === 'handlerData') {
        const data = await handlerBigFileData();
        postMessage(data)
    }
}
// 子线程加载数据
const loadFileData = async (name = 'AQYD') => {
    let moduleData: any;
    const modules = import.meta.glob("../mock/*.ts") as Record<string, any>
    let promiseFn: () => Promise<Record<string, any>>;
    for (let [key, value] of Object.entries(modules)) {
        if (key.includes(name)) {
            promiseFn = value
            let data = await promiseFn();
            if (data) {
                moduleData = data.default;
            }
        }
    }
    return moduleData;
}
// 超大数据处理
const handlerBigFileData = async (): Promise<number> => {
    let result = 0;
    return new Promise((resolve) => {
        for (let i = 0; i < 50000; i++) {
            result += i;
        }
        resolve(result);
    })
}
