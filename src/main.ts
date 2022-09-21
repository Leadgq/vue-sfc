import {createApp} from 'vue';
import App from './App.vue';
import {setStore} from "@/store";
import router, {setRouter} from "@/router/index";
import {loadTailWind} from "@/plugin/tailwind";
import {loadElementStyle} from "@/plugin/loadElement";

async function bootstrap() {
    const app = createApp(App);
    // 引入TailWind
    loadTailWind();
    // 引入非组件api的样式
    loadElementStyle();
    // 引入pinia
    setStore(app);
    // 引入router
    setRouter(app);
    await router.isReady();
    app.mount('#app')
}

await bootstrap();
