<template>
  <div class="login">
    <el-form :model="loginData" label-width="120px" :rules="loginRules" ref="ruleFormRef">
      <el-form-item label="用户名:" prop="name">
        <el-input v-model="loginData.name"/>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="loginData.password" type="password"/>
      </el-form-item>
      <el-form-item label="手机号:" prop="phone">
        <el-input v-model="loginData.phone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginUser">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {loginHook} from "@/tools/hook";
import type {FormInstance, FormRules} from 'element-plus'

let loginRules = reactive<FormRules>({
  name: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 5, message: '密码长度3到5位', trigger: 'blur'},
  ],
  phone: [
    {required: true, message: '请输入手机号', trigger: 'blur'}
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
  login(loginData, ruleFormRef.value!);
}
</script>

<style lang="scss" scoped>
.login {
  @apply w-[400px];
}
</style>
