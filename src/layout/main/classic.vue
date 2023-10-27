<!-- 经典布局 -->
<template>
    <el-container class="layout-container flex-center">
        <!-- <LayoutHeader /> -->
        <el-header></el-header>
        <el-container class="layout-main-height-50">
            <!-- <LayoutAside /> -->
            <el-aside></el-aside>
            <el-main>

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
import { defineComponent } from 'vue'

const LayoutParentView = defineAsyncComponent(() => import('@/layout/route/parent.vue'))

</script>

<style lang="scss" scoped>
</style>
