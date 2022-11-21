<template>
  <div>
    <div v-for="(item, index) in cityMap.values()" :key="index">
      <div v-for="(cItem, cIndex) in item" :key="cIndex">{{ cItem?.cityName }}</div>
    </div>
    <Father/>
    <div>
      <p>{{data.name}}</p>
      <p>{{data.age}}</p>
      <el-button @click="modify">修改</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Father from "@/components/test/father.vue";

let cityMap = ref(new Map());
const mockData = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          cityName: "大连",
          children: [
            {
              cityName: "沙河口区",
              cityCode: "210000",
            },
            {
              cityName: "高新园区",
              cityCode: "220000",
            },
          ],
        },
        {
          cityName: "沈阳",
          children: [
            {
              cityName: "大东区",
              cityCode: "210000",
            },
            {
              cityName: "浑南新区",
              cityCode: "220000",
            },
          ],
        },
      ]);
    }, 1000);
  });
};

onMounted(() => {
  handlerCityData();
});
let cityData = ref<any[]>([]);
const handlerCityData = async () => {
  const result = (await mockData()) as any[];
  result.forEach((item) => {
    cityMap.value.set(item.cityName, item.children);
  });
  cityData.value = (result || []).map((item) => {
    item[item.cityName] = item.children;
    return item;
  })
  // cityData.value.filter(item => item[name]).flatMap(item => item[name]);
};
// 不能解构如果非要解构可以使用toRefs
// 或者 { data:{ name,age }  }
let { data, modify } = reactive({
  data: {
    name: "gq",
    age: 22
  },
  modify() {
    data.name = "lisi";
  }
});
</script>
<style lang="scss" scoped></style>
