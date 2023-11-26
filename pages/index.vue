<template>
    <div>首页</div>
</template>

<script lang="ts" setup>
console.log(useRoute())

useHead({
    title: useRoute().meta.title as string,
})
</script>
