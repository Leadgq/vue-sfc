<template>
    <div class="w-full h-full">
        <TsxComponent>
            <template #header>我是头部</template>
            <template #footer>
                <div>hi</div>
            </template>
        </TsxComponent>
    </div>
</template>

<script setup lang='ts'>
import TsxComponent from "./index"
</script>
<style scoped lang='scss'>
</style>
