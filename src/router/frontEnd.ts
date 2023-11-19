import { setAddRoute } from '@/router/index'
import { dynamicRoutes } from '@/router/route'

// 前端控制路由

/**
 * 前端控制路由：初始化方法，防止刷新时路由丢失
 * @method  NextLoading 界面 loading 动画开始执行
 * @method useUserInfo(pinia).setUserInfos() 触发初始化用户信息 pinia
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export async function initFrontEndControlRoutes() {
    // // 界面 loading 动画开始执行
    // if (window.nextLoading === undefined) NextLoading.start()
    // // 无 token 停止执行下一步
    // if (!Session.get('token')) return false
    // // 触发初始化用户信息 pinia
    // // https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
    // await useUserInfo(pinia).setUserInfos()
    // // 无登录权限时，添加判断
    // // https://gitee.com/lyt-top/vue-next-admin/issues/I64HVO
    // if (useUserInfo().userInfos.roles.length <= 0) return Promise.resolve(true)

    // 添加动态路由
    await setAddRoute(dynamicRoutes)
    // 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
    // setFilterMenuAndCacheTagsViewRoutes()
}
