<template>
    <div>首页</div>
</template>

<script lang="ts" setup>
const router = useRouter()
setTimeout(() => {
    console.log('useRouter().get :>> ', router.getRoutes())
}, 1000)
</script>

<style lang="scss" scoped>
</style>
