<template>
  <div class="login-container">
    <div class="login-content">
      <div class="container-left"><img :src="LoginBg" alt="" /></div>
      <div class="container-right">
        <el-form :model="loginData" label-width="90px" :rules="loginRules" ref="ruleFormRef">
          <el-form-item label="用户名:" prop="name">
            <el-input v-model.trim="loginData.name" />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model.trim="loginData.password" type="password" />
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model.trim="loginData.phone" type="text" :maxlength="11" />
          </el-form-item>
          <el-form-item class="login-action">
            <el-button type="primary" @click="loginUser" class="login-btn">登录</el-button>
            <el-checkbox v-model="checkState" label="记住密码" size="large" class="ml-8" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {loginHook} from "@/tools/hook/hook";
import type {FormInstance, FormRules} from "element-plus";
import {getCookie, isAvailableObjectValue, isAvailablePhone, setCookie} from "@/tools/lib";
import userStore from "@/store/userStore";
import {decode, encode} from "js-base64";
import {loginUserType} from "@/types/userStoreType";

const userStoreInstance = userStore();
// 检查手机号
const checkPhone = (rule: any, value: any, callback: any) => {
  if (!isAvailablePhone(value)) {
    return callback(new Error("检查手机号是否正确"));
  } else {
    callback();
  }
};
// 规则
let loginRules = reactive<FormRules>({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 15, message: "密码长度6到15位", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { validator: checkPhone, trigger: "blur" },
  ],
});
let loginData = reactive<loginUserType>({
  name: "",
  password: "",
  phone: "",
});
let checkState = ref(false);
const ruleFormRef = ref<FormInstance>();
const { login } = loginHook();
const loginUser = () => {
  login(loginData, unref(ruleFormRef)!);
  modifyState();
};
onMounted(() => {
  handlerRememberPasswordState();
});
// 处理记住密码操作
const handlerRememberPasswordState = () => {
  checkState.value = userStoreInstance.rememberPasswordState;
  if (checkState.value) {
    // cookie解密
    const cookiesValues = getCookie(encode(window.location.origin));
    if (cookiesValues) {
      const formValue = JSON.parse(decode(cookiesValues)) as loginUserType;
      Object.assign(loginData, formValue);
    }
  }
};
// 修改记住密码状态
const modifyState = () => {
  if (!isAvailableObjectValue(loginData)) return;
  userStoreInstance.modifyRememberPasswordState(checkState.value);
  if (checkState.value) {
    setCookie(encode(`${window.location.origin}`), encode(JSON.stringify(loginData)), 1000);
  }
};
</script>

<script lang="ts">
export default {
  name: "login",
};
</script>
<style lang="scss" scoped>
.login-container {
  @apply h-full bg-violet-200 flex flex-col items-center justify-center;

  .login-content {
    @apply flex bg-white w-[800px] h-[400px] rounded shadow-md items-center;

    .container-left {
      @apply w-[400px] h-full;

      img {
        @apply w-full h-full object-cover;
      }
    }

    .container-right {
      @apply w-[380px];

      &:deep(.el-form-item) {
        @apply mb-7;
      }

      .login-action {
        @apply mb-0;

        .login-btn {
          @apply ml-10;
        }
      }
    }
  }
}
</style>
