import {App} from "vue";
import {createPinia} from "pinia"
import piniaPluginPersist from 'pinia-plugin-persist'


const store = createPinia();
store.use(piniaPluginPersist);
export const setStore = (app: App) => {
    app.use(store);
};
