<template>
  <div class="replace">
    <div class="content">
      <div class="title">{{ descTitle.title }}</div>
      <div class="desc">{{ descTitle.desc }}</div>
      <div class="count">{{ descTitle.content }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const descTitle = reactive({
  title: "很抱歉",
  desc: "您访问的页面走丢了",
  content: "404",
});
</script>
<style lang="scss" scoped>
.replace {
  @apply w-full h-full bg-gray-100 flex justify-center items-center;

  .content {
    @apply w-[800px] h-[600px] bg-white rounded-md shadow-sm flex 
    justify-center items-center flex-col;

    .common {
      @apply font-bold text-4xl;
    }

    .title {
      @extend .common;
      @apply text-violet-500;
    }

    .desc {
      @extend .common;
      @apply m-8 text-yellow-500;
    }

    .count {
      @extend .common;
    }
  }
}
</style>
