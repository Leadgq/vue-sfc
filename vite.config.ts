import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver, ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, __dirname);
    return {
        plugins: [
            vue({
                reactivityTransform: true
            }),
            vueJsx(),
            // 生成开启mock，可通过prodEnabled控制
            viteMockServe({
                mockPath: './src/mock',
                localEnabled: command === 'serve',
                prodEnabled: command !== 'serve' && Boolean(env.VITE_MOCK_STATE),
                injectCode: `
                  import { setupProdMockServer } from './mock/mockProdServer';
                  setupProdMockServer();
                `
            }),
            AutoImport({
                imports: ['vue', 'vue-router', '@vueuse/core', {
                    '@vueuse/math': ['useSum']
                }],
                dts: "src/auto-import.d.ts",
                dirs:['./src/tools']
            }),
            Components({
                dirs: ['src/components'],
                resolvers: [ElementPlusResolver(),AntDesignVueResolver()],
                dts: true,
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
                deep: true
            })],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        worker: {
            format: 'es'
        },
        server: {
            port: 5173,
            open: true,
            proxy: {
                '/api': {
                    target: env.VITE_HOST,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                },
                '/ws': {
                    target: env.VITE_WS,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/ws/, '')
                }
            }
        }
    };
});

