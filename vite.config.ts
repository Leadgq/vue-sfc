import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import {viteMockServe} from 'vite-plugin-mock'
import path from "path";

type viteConfig = {
    command: string,
    mode: string,
    ssrBuild: boolean
}
export default ({command, mode}: viteConfig) => {
    //环境变量
    const env = loadEnv(mode, __dirname);
    return defineConfig({
        plugins: [
            vue({
                reactivityTransform: true
            }),
            viteMockServe({
                mockPath: './src/mock',
                localEnabled: command === 'serve',
            }),
            AutoImport({
                imports: ['vue', 'vue-router'],
                dts: "src/auto-import.d.ts"
            }),
            Components({
                resolvers: [ElementPlusResolver()],
                dts: true,
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            })
        ],
        resolve: {
            alias: {'@': path.resolve(__dirname, 'src')}
        },
        server: {
            port: 5173,
            open: true,
            proxy: {
                '/api': {
                    target: env.VITE_HOST,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
                '/ws': {
                    target: env.VITE_WS,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/ws/, '')
                }
            }
        },
    })
}
