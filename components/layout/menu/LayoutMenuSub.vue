<!-- 菜单 -->
<template>
    <template v-for="val in childList" :key="val.path">
        <el-sub-menu v-if="val.children && val.children.length > 0" :index="val.path">
            <template #title>
                <!-- <SvgIcon :name="val.meta?.icon" /> -->
                <span>{{ val.meta?.title }}</span>
            </template>
            <LayoutMenuSub :children="val.children" />
        </el-sub-menu>
        <el-menu-item v-else :index="val.path">
            <template v-if="!val.meta?.isLink || (val.meta.isLink && val.meta.isIframe)">
                <!-- <SvgIcon :name="val.meta?.icon" /> -->
                <span>{{ val.meta?.title }}</span>
            </template>
            <template v-else>
                <a class="w100%" @click.prevent="onALinkClick(val)">
                    <!-- <SvgIcon :name="val.meta.icon" /> -->
                    {{ val.meta.title }}
                </a>
            </template>
        </el-menu-item>
    </template>
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

// 获取父级菜单数据
const childList = computed(() => {
    return props.children
})
// 打开外部链接
const onALinkClick = (val: RouteRecordRaw) => {
    // handleOpenLink(val as RouteItem)
}
</script>
