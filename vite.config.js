import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
<<<<<<< Updated upstream
export default defineConfig({
  plugins: [vue()]
})
=======
export default ({ mode }) => {
  //参数mode为开放模式或生产模式
  //console.log(mode);  // development or product 
  const env = loadEnv(mode, process.cwd());   // 获取.env文件里定义的环境变量
  //console.log(env);   //变量在命令行里打印出来
  

  return defineConfig({
    plugins: [vue(), Pages(), Layouts()],

    //项目部署在主域名的子文件使用,例如http://localhost:3000/myvite/。不填默认就是/ 
    base: env.VITE_APP_BASE_URL || '/',
    build: {
      // cssCodeSplit: false, //默认true,将css分割提取到css文件中，false将全部css提取到一个文件里
    },

    resolve: {
      alias: {
        //别名配置
        "@": path.resolve(__dirname, "src"), //配置src的别名
        "@comp": path.resolve(__dirname, "src/components"),
      },
    },
    server: {
      proxy: {
        // 代理配置
        // '/api': env.VITE_APP_API1,
        "/api": {
          // target: "http://127.0.0.1/1000", //本地服务器环境后台目录D:\phpstudy_pro\WWW\1000
          target: env.VITE_APP_API1,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        
        "/cnodejs": {
          target: "https://cnodejs.org/api/v1",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/cnodejs/, ""),
        },
        "/connect": {
          target: "https://oauth.cnblogs.com/connect",
          changeOrigin: true,
          rewrite: (path) => {
              // console.log(path); 
              return path.replace(/^\/connect/, "")
          },
        },
        "/cnbolg": {
          target: "https://api.cnblogs.com/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/cnbolg/, ""),
        },
      },
    },
  })
}
>>>>>>> Stashed changes
