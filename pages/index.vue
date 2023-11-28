<template>
    <div>
        首页

        <el-button @click="onLogout">
            clear
        </el-button>
    </div>
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

const token = useSessionStorage('token', '')
const onLogout = () => {
    token.value = ''
    location.reload()
}
</script>
