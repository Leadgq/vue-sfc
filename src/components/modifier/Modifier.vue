<template>
  <div class="w-full h-full bg-violet-200">
    <modifier-component v-model:book.capitalize="bookTitle" class="w-[300px]"  />
    <div>父组件中书籍名称为{{ bookTitle }}</div>
  </div>
</template>

<script setup lang="ts">
import ModifierComponent from "@/components/modifier/ModifierComponent.vue";

let bookTitle = ref<string>("三国演义");
</script>
<script lang="ts">
export default {
  name: "Modifier"
};
</script>

<style scoped>

</style>
