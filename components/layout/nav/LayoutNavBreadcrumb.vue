<!-- 面包屑导航 -->
<template>
    <div v-if="isShowBreadcrumb">
        <!-- 侧边菜单展开收起 -->
        <div class="h100% w40px flex cursor-pointer items-center justify-center" @click="onThemeConfigChange">
            <i :class="themeConfig.isCollapse ? 'i-ep-expand' : 'i-ep-fold'" />
        </div>
        <!-- 面包屑导航 -->
        <el-breadcrumb>
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(v, k) in breadcrumbList" :key="v.path">
                    <span v-if="k === breadcrumbList.length - 1">
                        <!-- <SvgIcon v-if="themeConfig.isBreadcrumbIcon" :name="v.meta?.icon" /> -->
                        <div v-if="!v.meta?.tagsViewName">{{ v.meta?.title }}</div>
                        <div v-else>{{ v.meta?.tagsViewName }}</div>
                    </span>
                    <a v-else @click.prevent="onBreadcrumbClick(v)">
                        <!-- <SvgIcon v-if="themeConfig.isBreadcrumbIcon" :name="v.meta?.icon" /> -->
                        {{ v.meta?.title }}
                    </a>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts" setup>
const { themeConfig, isDrawer } = useThemeState()

const isShowBreadcrumb = ref(true)

const breadcrumbList = computed(() => {
    return [] as RouteRecordCustom[]
})

const onThemeConfigChange = () => {
    themeConfig.value.isCollapse = !themeConfig.value.isCollapse
}

// 外链跳转
const onBreadcrumbClick = (row: RouteRecordCustom) => {

}
</script>

<style lang="scss" scoped>
</style>
