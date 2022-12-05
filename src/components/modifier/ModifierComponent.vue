<template>
  <div>
    <input
      :value="book"
      @input="modifyBookName($event)"
      class="outline-none py-0.5 pl-1 w-full" />
  </div>
</template>
<script setup lang="ts">
type propsType = {
  book: string
  bookModifiers: { capitalize?: boolean }
  imageStyle?: "round" | "square"
}
const props = withDefaults(defineProps<propsType>(), {
  imageStyle: "round"
});
const emit = defineEmits(["update:book"]);

const modifyBookName = (event: { target: { value: string; }; }) => {
  let value = event.target.value;
  if (props.bookModifiers.capitalize) console.log("ok");
  emit("update:book", value);
};
</script>
<script lang="ts">
export default {
  name: "ModifierComponent"
};
</script>

<style scoped>

</style>
