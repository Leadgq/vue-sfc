<template>
    <div class="w-full h-full">
        <TsxComponent :width="'300px'" :height="'200px'" :title="'测试'" :show-icon="true">
            <template #center>
                <div v-for="item in 15" :key="item">{{item}}</div>
            </template>
            <template #footer>底部</template>
        </TsxComponent>
    </div>
</template>

<script setup lang='ts'>
import TsxComponent from "./index"
</script>
<style scoped lang='scss'>
</style>
