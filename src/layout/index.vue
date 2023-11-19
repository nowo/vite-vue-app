<template>
    <component :is="layoutComponent" />
</template>

<script setup lang="ts" name="layout">
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'

// import mittBus from '@/utils/mitt'

// 定义变量内容
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)

// 相应的布局组件
const layoutComponent = computed(() => {
    const comp = themeConfig.value.layout
    if (comp === 'columns') {
        return defineAsyncComponent(() => import('@/layout/main/columns.vue'))
    } else if (comp === 'classic') {
        return defineAsyncComponent(() => import('@/layout/main/classic.vue'))
    } else if (comp === 'transverse') {
        return defineAsyncComponent(() => import('@/layout/main/transverse.vue'))
    } else { // 默认布局
        return defineAsyncComponent(() => import('@/layout/main/default.vue'))
    }
})
</script>
