import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport from 'vite-plugin-style-import'
// import { useDynamicPublicPath } from 'vite-plugin-dynamic-publicpath'
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd()) // 获取.env文件里定义的环境变量
    console.log(env.VITE_APP_BASE_URL)
    return defineConfig({
        base: env.VITE_APP_BASE_URL,
        server: {
            proxy: {
                // 选项写法
                '/mmxx_front/': {
                    target: 'https://gateway.mehome.shop/',
                    // target: 'https://gateway-pre.memall.shop/', //预发
                    // target: 'https://gateway.melive.shop/', // 线上
                    changeOrigin: true,
                    pathRewrite: {
                        '^/mmxx_front/': 'mmxx_front/',
                    },
                },
                // 正则表达式写法
                '^/fallback/.*': {
                    target: 'http://jsonplaceholder.typicode.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/fallback/, ''),
                },
            },
            port: '9000',
            https: false,
            cors: true,
        },
        plugins: [
            vue(),
            styleImport({
                libs: [{
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: (name) => {
                        return `element-plus/packages/theme-chalk/src/${name}.css`
                    },
                    resolveComponent: (name) => {
                        return `element-plus/lib/${name}`
                    },
                }, ],
            }),
            // useDynamicPublicPath({
            //     dynamicImportHandler: 'window.__dynamic_handler__',
            //     dynamicImportPreload: 'window.__dynamic_preload__',
            // }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        build: {
            sourcemap: false,
            cssCodeSplit: true,
            rollupOptions: {
                output: {
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    assetFileNames: '[ext]/[name]-[hash].[ext]',
                },
                brotliSize: false, // 不统计
                target: 'esnext',
                minify: 'esbuild', // 混淆器，terser构建后文件体积更小
            },
        },
    })
}