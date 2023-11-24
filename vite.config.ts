import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve, join } from 'path'
import AutoImport from 'unplugin-auto-import/vite' //自动引入ref,reactive等等等
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// import { ViteComponents } from 'vite-plugin-components'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, 'src'),
//     },
//     extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
//   }
// })


export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  return {
    root,
    base: '/',
    publicDir: resolve(__dirname, './dist'),
    assetsInclude: resolve(__dirname, './src/assets'), // 静态资源处理
    // ******插件配置******
    plugins: [
      vue(),
      // vueJsx(),
      WindiCSS(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            axios: [
              ['default', 'axios'] // import { default as axios } from 'axios',
            ]
          }
        ],
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    server:{
      https: false, //(使用https)启用 TLS + HTTP/2。注意：当 server.proxy 选项 也被使用时，将会仅使用 TLS
      host: true, // 监听所有地址
      port: 8188, //指定开发服务器端口：默认3000
      open: true, //启动时自动在浏览器中打开
      cors: false, //为开发服务器配置 CORS
    },
    // ******项目构建配置******
    build: {
      target: 'modules', //设置最终构建的浏览器兼容目标  //es2015(编译成es5) | modules
      outDir: 'dist', // 构建得包名  默认：dist
      assetsDir: 'assets', // 静态资源得存放路径文件名  assets
      sourcemap: false, //构建后是否生成 source map 文件
      minify: 'esbuild', // 项目压缩 :boolean | 'terser' | 'esbuild'
      chunkSizeWarningLimit: 1000, //chunk 大小警告的限制（以 kbs 为单位）默认：500
      cssTarget: 'chrome61' //防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式  (要兼容的场景是安卓微信中的 webview 时,它不支持 CSS 中的 #RGBA 十六进制颜色符号)
    },
    // ******resolver配置******
    resolve: {
      alias: {
        // 别名配置
        // 键必须以斜线开始和结束
        '@': resolve(__dirname, 'src'),
        components: resolve(__dirname, './src/components'),
        assets: resolve(__dirname, './src/assets'),
        '#': resolve(__dirname, 'types'),
        build: resolve(__dirname, 'build')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/main.scss";'
        }
      },
  
    },
  }
}
