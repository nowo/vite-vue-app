<template>
    <div>系统</div>
</template>

<script lang="ts" setup>
const getApiTest = async () => {
    const res = await useRequest('/api/admin_auth/validate_code', { method: 'get' })
    console.log(res)
}

onBeforeMount(() => {
    getApiTest()
})
</script>

