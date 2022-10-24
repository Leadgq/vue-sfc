// base64转换为blob，返回的纯blob流、
// 提交后台需要URL.createObjectURL(blob)
export const dataUrlToBlob = (base64: string, mimeType: 'image/jpeg') => {
    let bytes = window.atob(base64.split(",")[1]);
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeType});
}
// 图片压缩逻辑
export const recursionCompressH5 = (blob: Blob, quality: number): Promise<string> => {
    let img = document.createElement("img");
    let canvas = document.createElement("canvas");
    return new Promise((resolve) => {
        const blobUrl = URL.createObjectURL(blob);
        img.src = blobUrl;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d")!;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let imageData = canvas.toDataURL('image/jpeg', quality);
            resolve(imageData);
            // 释放内存
            URL.revokeObjectURL(blobUrl);
        }
    })
}
//blob转换为base64
export const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer> => {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            if (event.target?.result) {
                resolve(event.target.result);
            }
        }
        fileReader.readAsDataURL(blob);
    })
}
