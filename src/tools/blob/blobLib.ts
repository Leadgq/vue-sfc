/*
*   type:  blob / base
*   data : 数据源
*   status : 是否是uni的环境  默认不是
* */
export const recursionCompress = async (data: Blob | string, status = false): Promise<{ base64: string, blobData: Blob } | undefined> => {
  if (typeof data === "string") {
    return await handlerBase64(data, status);
    // 处理base64
  } else if (typeof data === "object") {
    return await handlerBlob(data, status);
  } else {
    return undefined;
  }
};
// 处理blob
const handlerBlob = async (data: Blob, status: boolean): Promise<{ base64: string, blobData: Blob }> => {
  // 处理blob
  const quality = checkMagnification(data.size);
  // 压缩之后的base64
  const base64 = await recursionCompressH5(data, quality, status);
  // 压缩之后的blob
  const blobData = dataUrlToBlob(base64);
  return {
    base64,
    blobData
  };
};
// 处理base64
const handlerBase64 = async (data: string, status: boolean): Promise<{ base64: string, blobData: Blob }> => {
  // 如果是base64先转换为blob
  const blob = dataUrlToBlob(data);
  // 计算大小
  const quality = checkMagnification(blob.size);
  // 压缩之后的base64
  const base64 = await recursionCompressH5(blob, quality, status);
  // 压缩之后的blob
  const blobData = dataUrlToBlob(base64);
  return {
    base64,
    blobData
  };
};
// 压缩比重
const checkMagnification = (size: number) => {
  let resultSize = size / 1024 / 1024;
  let quality = 1;
  if (resultSize > 0 && resultSize <= 0.8) {
    quality = 0.5;
  } else if (resultSize >= 1 && resultSize <= 2) {
    quality = 0.35;
  } else if (resultSize > 2 && resultSize <= 8) {
    quality = 0.2;
  } else if (resultSize > 8) {
    quality = 0.1;
  }
  return quality;
};
// 图片压缩逻辑
const recursionCompressH5 = (blobUrl: Blob, quality: number, status: boolean): Promise<string> => {
  let canvas = document.createElement("canvas");
  return new Promise((resolve) => {
    let blob, img: HTMLImageElement;
    // 如果不是uni 就正常创建
    if (!status) {
      img = document.createElement("img");
      blob = URL.createObjectURL(blobUrl);
    } else {
      // uni的情况
      img = new Image();
      blob = URL.createObjectURL(blobUrl);
    }
    img.src = blob;
    img.onload = () => {
      let screenWidth = img.width;
      let screenHeight = img.height;
      canvas.width = screenWidth;
      canvas.height = screenHeight;
      let ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      // 这里image/jpeg不可修改
      let imageData = canvas.toDataURL("image/jpeg", quality);
      resolve(imageData);
    };
  });
};
// base64转换为blob
const dataUrlToBlob = (base64: string) => {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
};
// blob转base64
const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target?.result);
    };
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error("blobToBase64 error"));
    };
  });
};
// base64计算图片大小
export const imageSize = (base64Str: string) => {
  const indexBase64 = base64Str.indexOf("base64,");
  if (indexBase64 < 0) return -1;
  const str = base64Str.substr(indexBase64 + 6);
  return (str.length * 0.75).toFixed(2);
};
