<template>
  <div class="table-container flex flex-col">
    <div class="search-tool flex">
      <a-select v-model:value="noticeState" style="width: 120px">
        <a-select-option
          v-for="(item, index) in companyList"
          :key="index"
          :value="item.value"
          >{{ item.label }}</a-select-option
        >
      </a-select>
    </div>
    <div class="flex-1">
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination="pagination"
        @change="pagination.change"
        @onShowSizeChange="pagination.onShowSizeChange"
        :row-selection="rowSelection"
        :rowKey="'id'"
        :scroll="{ y: 500 }"
      >
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface useType {
  id: number;
  name: string;
  key: number;
  age: string;
  address: string;
}

const dataSource = ref<Array<useType>>([]);
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];
let pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
  pageSizeOptions: ["20", "30", "40"],
  showSizeChanger: true,
  showQuickJumper: true,
  position: ["bottomLeft"],
  showTotal: (total: number) => `总条数:${total}条`,
  change: (page: Record<string, any>) => (pagination.current = page.current),
  onShowSizeChange: (_: number, pageSize: number) => (pagination.pageSize = pageSize),
});
onMounted(() => {
  setTableData();
});
const setTableData = () => {
  for (let i = 0; i < 100; i++) {
    dataSource.value.push({
      id: i,
      name: `第${i}个李四`,
      key: i,
      age: i + "岁",
      address: "大连",
    });
  }
  pagination.total = 50;
};

watchEffect(() => getTableDta(), { flush: "post" });

const companyList = computed(() => {
  return [
    {
      label: "停用",
      value: "0",
    },
    {
      label: "启用",
      value: "1",
    },
  ];
});
// 公告状态
let noticeState = ref<string>("");

// 获取数据模拟
const getTableDta = () => {
  let url = "current" + pagination.current + "&size=" + pagination.pageSize;
  if (noticeState.value) {
    url += "&company=" + noticeState.value;
  }
  console.log(url);
};

const rowSelection = reactive({
  selectedRowKeys: [] as (string | number)[],
  onChange: (selectedRowKey: (string | number)[]) => {
    if(selectedRowKey.length === 0){
     rowSelection.selectedRowKeys = [];
    }
    rowSelection.selectedRowKeys = [...selectedRowKey, ...rowSelection.selectedRowKeys];
    const setRowKeys = new Set(rowSelection.selectedRowKeys);
     rowSelection.selectedRowKeys = [...setRowKeys];
  },
  onSelect:(record:useType, selected:boolean)=>{
    // 取消
    if(!selected){
      const { id } = record;
       const index = rowSelection.selectedRowKeys.findIndex(item => item ===id);
       rowSelection.selectedRowKeys.splice(index,1)
    }
  }
});

onMounted(() => {
  setTimeout(() => {
    rowSelection.selectedRowKeys.push(1);
  }, 2000);
});
</script>
<script lang="ts">
export default {
  name: "table",
};
</script>

<style lang="scss" scoped>
.table-container {
  @apply w-full h-full bg-violet-200;
}
</style>
