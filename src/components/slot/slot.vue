<template>
  <div class="slot-container">
    <h3 class="font-bold">动态插槽</h3>
    <dynamic>
      <template #[distance]="{ slot }">我要渲染的地方是{{ distance }} {{ slot }}</template>
    </dynamic>
    <el-button @click="modifySlot">修改插槽渲染位置</el-button>
    <hr />
    <!--具名插槽-->
    <dynamic>
      <template #header>我要渲染在头部</template>
    </dynamic>
    <!-- 实现简单表格 -->
    <h5>自己的表格</h5>
    <div class="w-full h-[300px] bg-white">
      <table-safe :columns="columns" :data-source="dataSource" border>
        <template #headerCell="{ columns }">
          <span v-if="columns.key === 'name'">插槽姓名</span>
        </template>
        <template #bodyCell="{ column, record }">
          <div v-if="column.key === 'action'">
            <el-button type="primary">编辑</el-button>
            <el-button type="warning">编辑</el-button>
          </div>
          <div v-if="column.key === 'age'">
            <span>{{ modifyChange(record) }}</span>
          </div>
        </template>
      </table-safe>
    </div>
  </div>
</template>

<script setup lang="ts">
import TableSafe from "@/components/slot/table-safe.vue";

let distance = ref("header");
const modifySlot = () =>
  (distance.value = distance.value === "header" ? "main" : "header");

const columns = [
  {
    dataIndex: "name",
    key: "name",
    title: "姓名",
  },
  {
    dataIndex: "age",
    key: "age",
    title: "年龄",
  },
  {
    dataIndex: "address",
    key: "address",
    title: "地址",
  },
  {
    title: "操作",
    key: "action",
    width: "200px",
  },
];
const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 18,
    address: "中国",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 12,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 33,
    address: "Sidney No. 1 Lake Park",
  },
];

const modifyChange = (item: any) => (item.age >= 18 ? "成年" : "未成年");
</script>

<script lang="ts">
export default {
  name: "dynamic",
};
</script>

<style scoped lang="scss">
.slot-container {
  @apply h-full w-full bg-violet-200;
}
</style>
