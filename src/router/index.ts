import { createRouter, createWebHashHistory } from 'vue-router'

// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import pinia from '/@/stores/index'
// import { storeToRefs } from 'pinia'
// import { useKeepALiveNames } from '/@/stores/keepAliveNames'
// import { useRoutesList } from '/@/stores/routesList'
// import { useThemeConfig } from '/@/stores/themeConfig'
// import { Session } from '/@/utils/storage'
import { notFoundAndNoPower, staticRoutes } from '@/router/route'

// import { initFrontEndControlRoutes } from '/@/router/frontEnd'
// import { initBackEndControlRoutes } from '/@/router/backEnd'

/**
 * 1、前端控制路由时：isRequestRoutes 为 false，需要写 roles，需要走 setFilterRoute 方法。
 * 2、后端控制路由时：isRequestRoutes 为 true，不需要写 roles，不需要走 setFilterRoute 方法），
 * 相关方法已拆解到对应的 `backEnd.ts` 与 `frontEnd.ts`（他们互不影响，不需要同时改 2 个文件）。
 * 特别说明：
 * 1、前端控制：路由菜单由前端去写（无菜单管理界面，有角色管理界面），角色管理中有 roles 属性，需返回到 userInfo 中。
 * 2、后端控制：路由菜单由后端返回（有菜单管理界面、有角色管理界面）
 */

// 读取 `/src/stores/themeConfig.ts` 是否开启后端控制路由配置
// const storesThemeConfig = useThemeConfig(pinia)
// const { themeConfig } = storeToRefs(storesThemeConfig)
// const { isRequestRoutes } = themeConfig.value

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
export const router = createRouter({
    history: createWebHashHistory(),
    /**
     * 说明：
     * 1、notFoundAndNoPower 默认添加 404、401 界面，防止一直提示 No match found for location with path 'xxx'
     * 2、backEnd.ts(后端控制路由)、frontEnd.ts(前端控制路由) 中也需要加 notFoundAndNoPower 404、401 界面。
     *    防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
     */
    routes: [...notFoundAndNoPower, ...staticRoutes],
})

// // 路由加载前
// router.beforeEach(async (to, from, next) => {
//     NProgress.configure({ showSpinner: false })
//     if (to.meta.title) NProgress.start()
//     const token = Session.get('token')
//     if (to.path === '/login' && !token) {
//         next()
//         NProgress.done()
//     } else {
//         if (!token) {
//             next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`)
//             Session.clear()
//             NProgress.done()
//         } else if (token && to.path === '/login') {
//             next('/home')
//             NProgress.done()
//         } else {
//             const storesRoutesList = useRoutesList(pinia)
//             const { routesList } = storeToRefs(storesRoutesList)
//             if (routesList.value.length === 0) {
//                 if (isRequestRoutes) {
//                     // 后端控制路由：路由数据初始化，防止刷新时丢失
//                     await initBackEndControlRoutes()
//                     // 解决刷新时，一直跳 404 页面问题，关联问题 No match found for location with path 'xxx'
//                     // to.query 防止页面刷新时，普通路由带参数时，参数丢失。动态路由（xxx/:id/:name"）isDynamic 无需处理
//                     next({ path: to.path, query: to.query })
//                 } else {
//                     // https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
//                     await initFrontEndControlRoutes()
//                     next({ path: to.path, query: to.query })
//                 }
//             } else {
//                 next()
//             }
//         }
//     }
// })

// // 路由加载后
// router.afterEach(() => {
//     NProgress.done()
// })

// 导出路由
export default router
