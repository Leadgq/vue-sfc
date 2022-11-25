<template>
  <div class="table-safe">
    <table>
      <thead>
      <tr>
        <th v-for="item in 3">{{ item }}</th>
      </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "table-safe"
};
</script>

<style scoped lang="scss">
.table-safe {
  @apply w-full h-full;
}
</style>
