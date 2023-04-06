<template>
    <div class="w-full h-full bg-violet-50">
        <div class="w-[300px]">
            <my-input v-model="data" ref="myInputRef">
                <template #suffix>
                    后缀
                </template>
                <template #prefix>
                    <el-button @click="clear">清空</el-button>
                </template>
            </my-input>
        </div>
    </div>
</template>

<script lang="ts" setup>
import myInput from "./my-input.vue";

let data = ref("");
const myInputRef = ref<InstanceType<typeof myInput> | null>(null)
const clear = () => {
    data.value = "";
}

onMounted(() => {
    myInputRef.value!.focus();
})
</script>

<style scoped>

</style>
