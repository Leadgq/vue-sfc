<template>
  <div class="affix" ref="root" :style="rootStyle">
    <div class="affix-content" :class="{ fixed }" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CSSProperties } from "vue";

const props = withDefaults(
  defineProps<{
    offset?: number;
    zIndex?: number;
    position?: "top" | "bottom";
  }>(),
  { offset: 0, zIndex: 100, position: "top" }
);
// 目标元素
const root = shallowRef<HTMLElement>();
const fixed = ref(false);
// 目标元素信息
const {
  height: rootHeight,
  width: rootWidth,
  top: rootTop,
  bottom: rootBottom,
  update: updateRoot
} = useElementBounding(root.value);
console.log(rootTop,rootBottom);
// 滚动容器
const scrollContainer = shallowRef<HTMLElement | Window>();

onMounted(() => {
  // 我们先以window作为滚动容器
  scrollContainer.value = window;
  // 更新root的信息
  updateRoot();
});

const update = () => {
  if (!scrollContainer.value) return;
  if(props.position === 'top'){
    fixed.value = props.offset >= rootTop.value;
  }
};
watchEffect(update);
const rootStyle = computed<CSSProperties>(() => {
  return {
    width: fixed.value ? `${rootWidth.value}px` : "",
    height: fixed.value ? `${rootHeight.value}px` : ""
  };
});
const affixStyle = computed<CSSProperties>(() => {
  if (!fixed.value) return {};
  return {
    width: `${rootWidth.value}px`,
    height: `${rootHeight.value}px`,
    top: `${props.offset}px`,
    bottom: props.position === 'bottom' ? `${props.offset}px` : '',
    zIndex: props.zIndex
  };
});
</script>
<script lang="ts">
export default {
  name: "affix-component"
};
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
}
</style>
