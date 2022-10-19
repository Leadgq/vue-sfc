// base64转换为blob
export const dataUrlToBlob = (base64: string, mimeType: string) => {
    let bytes = window.atob(base64.split(",")[1]);
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeType});
}
// 图片压缩逻辑
export const recursionCompressH5 = (blob: Blob, type: string) => {
    let img = document.createElement("img");
    let canvas = document.createElement("canvas");
    return new Promise((resolve) => {
        // @ts-ignore
        img.src = blob;
        img.onload = () => {
            let screenWidth = img.width;
            let screenHeight = img.height;
            canvas.width = screenWidth;
            canvas.height = screenHeight;
            let ctx = canvas.getContext("2d")!;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let imageData = canvas.toDataURL(type, 0.1);
            resolve(imageData);
        }
    })
}
