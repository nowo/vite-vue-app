<!-- 标签页 -->
<template>
    <el-scrollbar>
        <ul class="tag-view-ul flex gap-5px p8px">
            <!-- :class="{on:$route.path===v.path}" -->
            <li v-for="item in 50" :key="item" class="tag-view-item">
                {{ item }}
            </li>
        </ul>
    </el-scrollbar>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.tag-view-ul {
    &:after {
        content: '';
        padding-left: 5px;
    }
}

.tag-view-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    // margin: 8px;
    padding: 0 15px;
    text-align: center;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
        border-color: var(--el-color-primary-light-5);
    }

    &.on {
        color: var(--el-color-white);
        background: var(--el-color-primary);
        border-color: var(--el-color-primary);
    }
}
</style>
