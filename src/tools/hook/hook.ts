import userStore from "@/store/userStore";
import { loginUserType } from "@/types/userStoreType";
import router from "@/router";
import { FormInstance } from "element-plus";
import { ComputedRef } from "vue";

export const useLogin = () => {
  const loginData = reactive<loginUserType>({
    name: "",
    password: "",
    phone: "",
    code: "",
  });
  const userStoreInstance = userStore();
  const login = async (ruleFormRef: FormInstance) => {
    await ruleFormRef.validate((valid: boolean) => {
      if (valid) pathAction();
    });
  };
  const pathAction = async () => {
    // 请求登录
    await userStoreInstance.loginRequest(loginData);
    // 获取用户权限
    await userStoreInstance.getUserInfoPromise();
    // 路由跳转
    await router.push({ path: "/component-sfc" });
  };
  return {
    login,
    loginData,
  };
};

export const useBase64 = (el: string): Promise<{ dataURL: string }> => {
  const toBase64 = (image: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx?.drawImage(image, 0, 0, image.width, image.height);
    return canvas.toDataURL("image/png");
  };
  return new Promise((resolve) => {
    onMounted(() => {
      const image = document.querySelector("#el") as HTMLImageElement;
      image.onload = () => {
        resolve({
          dataURL: toBase64(image),
        });
      };
    });
  });
};

// 创建水印
export const useWatermark = (props: {
  text: string;
  fontSize: number;
  gap: number;
}): ComputedRef<{
  size: number;
  base64: string;
  styleSize: number;
}> => {
  return computed(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const fontSize = props.fontSize * devicePixelRatio;
    ctx.font = `${fontSize}px serif, Microsoft`;
    const { width } = ctx.measureText(props.text);
    const canvasSize = Math.max(width, 100) + props.gap * devicePixelRatio;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // 旋转45度
    ctx.rotate((-45 * Math.PI) / 180);
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(props.text, 0, 0);
    return {
      base64: canvas.toDataURL(),
      size: canvasSize,
      styleSize: canvasSize / devicePixelRatio,
    };
  });
};
export const useCountDown = (time: number, delay = 1, isStart = true) => {
  let isStartFlag = false;
  let countDownValue = ref(time);
  let timer: any = null;
  const start = () => {
    if (isStartFlag) return;
    isStartFlag = true;
    timer = setInterval(() => {
      countDownValue.value--;
      if (countDownValue.value === 0) {
        isStartFlag = false;
        clearInterval(timer);
        countDownValue.value = time;
      }
    }, delay * 1000);
  };
  if (isStart) start();
  onUnmounted(() => {
    timer && clearInterval(timer);
  });
  return {
    countDownValue,
    start,
  };
};
