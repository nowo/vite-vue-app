import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'

// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import pinia from '/@/stores/index'
// import { storeToRefs } from 'pinia'
// import { useKeepALiveNames } from '/@/stores/keepAliveNames'
// import { useRoutesList } from '/@/stores/routesList'
// import { useThemeConfig } from '/@/stores/themeConfig'
import { dynamicRoutes, notFoundAndNoPower, staticRoutes } from '@/router/route'
import { initFrontEndControlRoutes } from '@/router/frontEnd'
import { initBackEndControlRoutes } from '@/router/backEnd'
import { Session } from '@/utils/storage'

const NProgress = useNProgress()

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

/**
 * 路由多级嵌套数组处理成一维数组
 * @param arr 传入路由菜单数据数组
 * @returns 返回处理后的一维路由菜单数组
 */
export function formatFlattenRoutes(arr: RouteRecordRaw[]) {
    if (arr.length <= 0) return []
    for (let i = 0; i < arr.length; i++) {
        const child = arr[i].children
        if (child) {
            arr = arr.slice(0, i + 1).concat(child, arr.slice(i + 1))
        }
    }
    return arr
}

/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存）
 * @description isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
 * @link 参考：https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 * @param arr 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成 `定义动态路由（dynamicRoutes）` 的格式
 */
export function formatNestFlattenRoutes(arr: RouteRecordRaw[]) {
    // if (arr.length <= 0) return false
    const newArr: RouteRecordRaw[] = []
    const cacheList: Array<string> = []
    arr.forEach((v) => {
        if (v.path === '/') {
            newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] })
        } else {
            // 判断是否是动态路由（xx/:id/:name），用于 tagsView 等中使用
            // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
            if (v.path.includes('/:')) {
                v.meta!.isDynamic = true
                v.meta!.isDynamicPath = v.path
            }
            if (!newArr[0].children) newArr[0].children = []
            newArr[0].children.push({ ...v })
            // 存 name 值，keep-alive 中 include 使用，实现路由的缓存
            // 路径：@/layout/route/parent.vue
            if (newArr[0].meta?.isKeepAlive && v.meta?.isKeepAlive) {
                cacheList.push(v.name as string)

                const stores = useKeepALiveNames()
                stores.setKeepALiveNames(cacheList)
            }
        }
    })
    return newArr
}

/**
 * 获取当前用户权限标识去比对路由表（未处理成多级嵌套路由）
 * @description 这里主要用于动态路由的添加，router.addRoute
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 * @param children dynamicRoutes（@/router/route）第一个顶级 children 的下路由集合
 * @returns 返回有当前用户权限标识的路由数组
 */
export function setFilterRoute(children: RouteRecordRaw[]) {
    const userState = useUserInfo()

    const filterRoute = children.filter((route) => {
        if (route.meta?.roles) {
            // 判断菜单角色标识存在于用户信息里面
            return route.meta.roles.some(role => userState.userInfo?.roles.includes(role))
        }
        return false
    })

    // const filterRoute: any = []
    // children.forEach((route: any) => {
    //     if (route.meta.roles) {
    //         route.meta.roles.forEach((metaRoles: any) => {
    //             userState.userInfo?.roles.forEach((roles: any) => {
    //                 if (metaRoles === roles) filterRoute.push({ ...route })
    //             })
    //         })
    //     }
    // })
    return filterRoute
}

/**
 * 获取有当前用户权限标识的路由数组，进行对原路由的替换
 * @description 替换 dynamicRoutes（/@/router/route）第一个顶级 children 的路由
 * @returns 返回替换后的路由数组
 */
export function setFilterRouteEnd(arr: RouteRecordRaw[]) {
    const filterRouteEnd = formatNestFlattenRoutes(formatFlattenRoutes(arr))
    console.log('filterRouteEnd 000:>> ', JSON.stringify(filterRouteEnd[0].children))
    // notFoundAndNoPower 防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
    // 关联问题 No match found for location with path 'xxx'
    filterRouteEnd[0].children = [...setFilterRoute(filterRouteEnd[0].children || []), ...notFoundAndNoPower]
    return filterRouteEnd
}

/**
 * 添加动态路由,添加如有前将路由数据存入pinia中，用于判断是否添加了路由
 * @method router.addRoute
 * @description 此处循环为 dynamicRoutes（/@/router/route）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
export async function setAddRoute(arr: RouteRecordRaw[]) {
    const routes = setFilterRouteEnd(arr)
    const routeState = useRoutesList()
    routeState.setRoutesList(routes)

    await routes.forEach((route: RouteRecordRaw) => {
        router.addRoute(route)
    })
}

// 路由加载前
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if (to.meta.title) NProgress.start()
    const token = Session.get('token')
    // console.log(dynamicRoutes)
    // console.log(formatFlattenRoutes(dynamicRoutes))
    const themeConfigState = useThemeConfig()
    // console.log(themeConfigState.themeConfig.isRequestRoutes)
    // console.log('router.hasRoute(to.name) :>> ', router.hasRoute(to.name))
    // console.log('to :>> ', to)

    // const listRoutes = formatFlattenRoutes(dynamicRoutes)
    // listRoutes.forEach((item) => {
    //     router.addRoute(item)
    // })

    const routeState = useRoutesList()
    console.log('routeState :>> ', routeState)
    if (routeState.routesList.length) {
        next()
    } else {
        if (themeConfigState.themeConfig.isRequestRoutes) { // 后端控制路由：路由数据初始化，防止刷新时丢失
            console.log('111111111111111 :>> ', 111111111111111)
            initBackEndControlRoutes()
            next({ path: to.path, query: to.query })
        } else { // 前端控制路由
            initFrontEndControlRoutes()
            next({ path: to.path, query: to.query })
        }
        // setAddRoute(dynamicRoutes)
    }

    // if (!router.hasRoute(to.name)) {
    //     router.addRoute(formatFlattenRoutes(dynamicRoutes))

    //     next({ path: to.path, query: to.query })
    //     return to.fullPath
    // } else {
    //     next()
    // }

    // console.log(setAddRoute())

    // if (!hasNecessaryRoute(to)) {
    //     router.addRoute(generateRoute(to))
    //     // 触发重定向
    //     return to.fullPath
    // }

    // if (to.path === '/login' && !token) {
    //     next()
    //     NProgress.done()
    // } else {
    //     if (!token) {
    //         next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`)
    //         Session.clear()
    //         NProgress.done()
    //     } else if (token && to.path === '/login') {
    //         next('/home')
    //         NProgress.done()
    //     } else {
    //         const storesRoutesList = useRoutesList(pinia)
    //         const { routesList } = storeToRefs(storesRoutesList)
    //         if (routesList.value.length === 0) {
    //             if (isRequestRoutes) {
    //                 // 后端控制路由：路由数据初始化，防止刷新时丢失
    //                 await initBackEndControlRoutes()
    //                 // 解决刷新时，一直跳 404 页面问题，关联问题 No match found for location with path 'xxx'
    //                 // to.query 防止页面刷新时，普通路由带参数时，参数丢失。动态路由（xxx/:id/:name"）isDynamic 无需处理
    //                 next({ path: to.path, query: to.query })
    //             } else {
    //                 // https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
    //                 await initFrontEndControlRoutes()
    //                 next({ path: to.path, query: to.query })
    //             }
    //         } else {
    //             next()
    //         }
    //     }
    // }
})

// 路由加载后
router.afterEach(() => {
    NProgress.done()
})

// 导出路由
export default router
