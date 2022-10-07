<template>
  <div>
    <div v-for="(item, index) in [...cityMap.values()]" :key="index">
      <div v-for="(cItem, cIndex) in item" :key="cIndex">{{ cItem?.cityName }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
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

const handlerCityData = async () => {
  const result = (await mockData()) as any[];
  result.forEach((item) => {
    cityMap.value.set(item.cityName, item.children);
  });
};
</script>
<style lang="scss" scoped></style>
