<!-- 经典布局 -->
<template>
    <el-container>
        <LayoutHeader />
        <el-container>
            <LayoutAside />
            <div>
                <!-- <TagsView v-if="themeConfig.isTagsView" /> -->
                <LayoutMain>
                    <slot />
                </LayoutMain>
            </div>
        </el-container>

    </el-container>
</template>

<script setup lang="ts"></script>
