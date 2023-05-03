import {createApp} from 'vue';
import App from './App.vue';
import {setStore} from "@/store";
import {setRouter} from "@/router";
import {loadTailWind} from "@/plugin/tailwind";
import {loadElementStyle} from "@/plugin/loadElement";
import {setAnimateCss} from "@/plugin/animate";
import { registerDirectives } from "@/directives";
import loadingPlugin from "@/components/loading";

const app = createApp(App);
// 加载动画
setAnimateCss();
// 引入TailWind
loadTailWind();
// 引入非组件api的样式
loadElementStyle();
// 引入pinia
setStore(app);
// 引入router
setRouter(app);
registerDirectives(app);
app.use(loadingPlugin)
app.mount('#app')