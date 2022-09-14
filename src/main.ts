import { createApp } from 'vue';
import App from './App.vue';
import { loadTailWind } from "@/plugin/tailwind";
import store from "@/store/index"
import router from "@/router/index";
const appInstance = createApp(App);
appInstance.use(router).use(store);
// 当路由准备
router.isReady().then(() => {
    // 加载tailwind
    loadTailWind();
    appInstance.mount('#app');
})


