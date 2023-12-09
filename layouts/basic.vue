<template>
    <el-container class="layout-container h100%">
        <LayoutAside />
        <el-container>
            <!-- <LayoutHeader /> -->
            <el-scrollbar class="w100%">
                <LayoutHeader />
                <LayoutMain>
                    <slot />
                </LayoutMain>
            </el-scrollbar>
        </el-container>
        <!-- <el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop> -->
    </el-container>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
</style>
