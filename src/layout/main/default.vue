<!-- 默认布局 -->
<template>
    <el-container class="layout-container flex-center">
        <!-- <LayoutHeader /> -->

        <el-aside>
            <div v-for="item in routes" :key="item.path">
                <RouterLink :to="item.path">{{ item.name }}</RouterLink>
            </div>
        </el-aside>
        <el-container class="layout-main-height-50">
            <!-- <LayoutAside /> -->
            <el-header></el-header>
            <el-main>
                默认布局
                <LayoutParentView />

            </el-main>
            <!-- <div class="flex-center layout-backtop">

                <LayoutTagsView v-if="themeConfig.isTagsView" />
                <LayoutMain ref="layoutMainRef" />
            </div> -->
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
const LayoutParentView = defineAsyncComponent(() => import('@/layout/route/parent.vue'))

const routes = useRouter().getRoutes()

</script>

<style lang="scss" scoped>
</style>
