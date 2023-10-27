import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由列表
 * @methods setRoutesList 设置路由数据
 * @methods setColumnsMenuHover 设置分栏布局菜单鼠标移入 boolean
 * @methods setColumnsNavHover 设置分栏布局最左侧导航鼠标移入 boolean
 */
export const useRoutesList = defineStore('routesList', () => {
    // 动态设置的路由数据
    const routesList = ref<RouteRecordRaw[]>([])

    // 接口返回的路由数据
    const routesOldList = ref<RouteRecordRaw[]>([])

    const isColumnsMenuHover = ref<boolean>(false)
    const isColumnsNavHover = ref<boolean>(false)

    const setRoutesList = async (data: RouteRecordRaw[]) => {
        routesList.value = data
    }

    const setRoutesOldList = async (data: RouteRecordRaw[]) => {
        routesList.value = data
    }

    const setColumnsMenuHover = async (bool: boolean) => {
        isColumnsMenuHover.value = bool
    }
    const setColumnsNavHover = async (bool: boolean) => {
        isColumnsNavHover.value = bool
    }

    // requestOldRoutes: [],

    return {
        routesList,
        routesOldList,
        isColumnsMenuHover,
        isColumnsNavHover,
        setRoutesList,
        setRoutesOldList,
        setColumnsMenuHover,
        setColumnsNavHover,
    }
})

/**
 * 路由缓存列表
 * @methods setCacheKeepAlive 设置要缓存的路由 names（开启 TagsView）
 * @methods addCachedView 添加要缓存的路由 names（关闭 TagsView）
 * @methods delCachedView 删除要缓存的路由 names（关闭 TagsView）
 * @methods delOthersCachedViews 右键菜单`关闭其它`，删除要缓存的路由 names（关闭 TagsView）
 * @methods delAllCachedViews 右键菜单`全部关闭`，删除要缓存的路由 names（关闭 TagsView）
 */
export const useKeepALiveNames = defineStore('keepALiveNames', () => {
    const keepALiveNames = ref<string[]>([])

    const cachedViews = ref<string[]>([])

    const setKeepALiveNames = async (data: string[]) => {
        keepALiveNames.value = data
    }

    return {
        keepALiveNames,
        cachedViews,
        setKeepALiveNames,
    }
})
