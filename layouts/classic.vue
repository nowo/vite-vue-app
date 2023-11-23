<!-- 经典布局 -->
<template>
    <el-container direction="vertical" class="h100%">
        <LayoutHeader class="bg-#eee" />
        <el-container>
            <LayoutAside class="bg-#555" />
            <!-- <div> -->
            <!-- <TagsView v-if="themeConfig.isTagsView" /> -->
            <LayoutMain>
                <slot />
            </LayoutMain>
            <!-- </div> -->
        </el-container>
    </el-container>
</template>

<script setup lang="ts"></script>
