<template>
  <div class="login">
    <el-form :model="loginData" label-width="120px" :rules="loginRules" ref="ruleFormRef">
      <el-form-item label="用户名:" prop="name">
        <el-input v-model.trim="loginData.name"/>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model.trim="loginData.password" type="password"/>
      </el-form-item>
      <el-form-item label="手机号:" prop="phone">
        <el-input v-model.trim="loginData.phone" type="text" :maxlength="11"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginUser">登录</el-button>
        <el-checkbox v-model="checkState" label="记住密码" size="large" class="ml-5"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {loginHook} from "@/tools/hook/hook";
import type {FormInstance, FormRules} from 'element-plus'
import {isAvailableObject, isAvailablePhone, setCookie} from "@/tools/lib";
import userStore from "@/store/userStore";
import {encode} from 'js-base64';

const storeInstance = userStore();
// 检查手机号
const checkPhone = (rule: any, value: any, callback: any) => {
  if (!isAvailablePhone(value)) {
    return callback(new Error('检查手机号是否正确'))
  } else {
    callback();
  }
}
// 规则
let loginRules = reactive<FormRules>({
  name: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 15, message: '密码长度6到15位', trigger: 'blur'},
  ],
  phone: [
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {validator: checkPhone, trigger: 'blur'}
  ],
});
let loginData = reactive({
  name: '',
  password: '',
  phone: ''
})
let checkState = ref(false);
const ruleFormRef = ref<FormInstance>();
const {login} = loginHook();
const loginUser = () => {
  login(loginData, unref(ruleFormRef)!);
  modifyState();
}
onMounted(() => {
  handlerRememberPasswordState()
})
// 处理记住密码操作
const handlerRememberPasswordState = () => {
  checkState.value = storeInstance.rememberPasswordState;
  if (checkState.value) {
    console.log(encode(window.location.origin))
  }
}
// 修改记住密码状态
const modifyState = () => {
  storeInstance.modifyRememberPasswordState(checkState.value);
  if (checkState.value && isAvailableObject(loginData)) {
    setCookie(encode(`${window.location.origin}`), encode(JSON.stringify(loginData)), 1000)
  }
}
</script>

<script lang="ts">
export default {
  name: 'login'
}
</script>
<style lang="scss" scoped>
.login {
  @apply w-[400px];
}
</style>
