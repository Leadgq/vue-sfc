// @ts-ignore
onmessage = async function (event) {
    if (event.data === 'load') {
        const data = await loadFileData();
        postMessage(data)
    } else if (event.data === 'handlerData') {
        const data = await handlerBigFileData();
        postMessage(data)
    }
}

// 子线程加载数据
const loadFileData = async () => {
    const module = import.meta.glob("../mock/AQYD.ts");
    let moduleData = {};
    let data = await Object.values(module)[0]() as Record<string, any>;
    if (data) {
        moduleData = data.default;
    }
    return moduleData;
}

// 超大数据处理
const handlerBigFileData = async (): Promise<number> => {
    let result = 0;
    return new Promise((resolve) => {
        for (let i = 0; i < 1000000; i++) {
            result += i;
        }
        resolve(result);
    })
}
