<template>
    <div>首页</div>
</template>

<script lang="ts" setup>
definePageMeta({
    // layout: false,
    layout: 'default',
    title: '首页',
})

console.log(useRoute())

useHead({
    title: useRoute().meta.title as string,
})
</script>
