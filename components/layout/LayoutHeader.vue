<template>
    <el-header height="auto" class="p0!" :class="{ 'header-fixed': themeConfig.isFixedHeader }">
        <div class="h50px flex justify-between">
            <LazyLayoutNavBreadcrumb class="h100%" />
            <LazyLayoutNavBar class="h100%" />
        </div>
        <el-divider class="ma!" style="border-color:var(--el-border-color-lighter);" />
        <LazyLayoutTagView />
    </el-header>
</template>

<script lang="ts" setup>
// import { LazyLayoutNavBar, LazyLayoutNavBreadcrumb,LazyLayoutTagView } from '#components'

const { themeConfig } = useThemeState()
</script>

<style lang="scss" scoped>
.header-fixed {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 4;
    background-color: var(--el-color-white);
}
</style>
