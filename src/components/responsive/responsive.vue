<template>
  <div>
    <el-button @click="count++">按钮</el-button>
    <ResponsiveOption :count="count"/>
  </div>
</template>

<script setup lang="ts">
import ResponsiveOption from "./responsive-option.vue"
let count = ref(2);
</script>
