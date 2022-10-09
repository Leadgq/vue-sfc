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
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {loginHook} from "@/tools/hook/hook";
import type {FormInstance, FormRules} from 'element-plus'

const checkPhone = (rule: any, value: any, callback: any) => {
  const reg = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
  if (!reg.test(value)) {
    return callback(new Error('检查手机号是否正确'))
  } else {
    callback();
  }
}
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
const ruleFormRef = ref<FormInstance>();
const {login} = loginHook();

const loginUser = () => {
  login(loginData, unref(ruleFormRef)!);
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
