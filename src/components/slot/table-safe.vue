<template>
  <div class="table-safe">
    <table class="table-safe-container">
      <thead class="table-header">
        <tr class="table-tr">
          <th
            v-for="item in columns"
            :key="item.key"
            class="table-th"
            :style="modifyStyle(item)"
            :class="{ border }"
          >
            <slot name="headerCell" :columns="item">{{ item.title }}</slot>
          </th>
        </tr>
      </thead>
      <tbody class="table-body">
      <tr class="table-body-tr" v-for="(column,index) in dataSource" :key="column.key" >
        <td v-for="(record,recordIndex) in columns"
            :style="modifyStyle(record)"
            :key="record.key"
            :class="{ border  }">
          <slot v-if="record.key" name="bodyCell" :column="columns[recordIndex]" :record="dataSource[index]">
            {{ column[record.key] }}
          </slot>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
interface columnsTypes {
  dataIndex?: string;
  key: string;
  width?: string;
  title?: string;
}
interface props {
  columns: columnsTypes[];
  dataSource: any[];
  border?: boolean;
}
withDefaults(defineProps<props>(), { border: false });
const modifyStyle = (item: columnsTypes) => {
  return {
    width: item.width,
  };
};
</script>
<script lang="ts">
export default {
  name: "table-safe",
};
</script>

<style scoped lang="scss">
.table-safe {
  @apply w-full h-full p-4 border-[1px] border-gray-50;
  .border{
    @apply border-b-[1px] border-r-[1px]  border-l-[1px];
  }
  .common {
    @apply  text-sm text-gray-700;
  }
  .table-safe-container {
    @apply w-full h-full;
    .table-header {
      @apply w-full bg-gray-50;
      .table-tr {
        @apply w-full;
        .table-th {
          @extend .common;
          @apply h-10;
        }
      }
    }
    .table-body {
      @apply w-full  h-full;
      .table-body-tr {
        @apply w-full text-center;
        td {
          @extend .common;
        }
      }
    }
  }
}
</style>
