<template>
    <div>
        <el-input v-bind="attrs" ref="ele">
            <template v-for="(_,name) in slot" :key="name" #[name]>
                <slot :name="name"></slot>
            </template>
        </el-input>
    </div>
</template>

<script setup lang="ts">
import {ElInput} from "element-plus";

const instance = getCurrentInstance();
const attrs = instance?.attrs
const slot = instance?.slots;
const ele = ref<InstanceType<typeof ElInput> | null>(null)
onMounted(() => {
    for (const [key, value] of Object.entries(ele.value!)) {
        instance!.exposed![key] = value
    }
})
</script>

