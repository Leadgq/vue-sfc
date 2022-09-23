// @ts-ignore
onmessage = async function (event) {
    if (event.data) {
        const data = await loadFileData();
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
