<!-- 菜单 -->
<template>
    <el-menu  router :default-active="$route.path" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose">
        <LayoutMenuSub :children="routes" />
    </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

// 定义父组件传过来的值
const props = defineProps({
    // 菜单列表
    children: {
        type: Array<RouteRecordRaw>,
        default: () => [],
    },
})

const routes = useRouter().getRoutes()
console.log(routes)

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)

    const routes = useRouter().getRoutes()
    console.log(routes)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

// 获取父级菜单数据
const childList = computed(() => {
    return props.children
})
// 打开外部链接
const onALinkClick = (val: RouteRecordRaw) => {
    // handleOpenLink(val as RouteItem)
}
</script>
