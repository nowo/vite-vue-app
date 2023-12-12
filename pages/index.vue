<template>
    <div>
        首页

        <el-button @click="onLogout">
            clear
        </el-button>
        <div>
            <CoUpload v-model="list" :limit="1" />
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    // layout: false,
    layout: 'default',
    title: '首页',
})

if (process.client) console.log(useRoute())

// const list = ref([
//     'https://img.goyojo.com/20231208/202312081441371472.png?x-oss-process=image/quality,Q_50',
//     'https://img.goyojo.com/20231208/202312081441371472.png?x-oss-process=image/quality,Q_50',
//     'http://oss.lyecs.com/img/gallery/202304/1681543152itOKOK3dmbqAidvxtr!!pic200x200.jpeg',
//     'https://img.goyojo.com/20231208/202312081441371472.png?x-oss-process=image/quality,Q_50',
//     'https://alfred-skyblue.github.io/vue-draggable-plus/logo.svg'
// ])

const list = ref('')

useHead({
    title: useRoute().meta.title as string,
})

const token = useSessionStorage('token', '')
const onLogout = () => {
    token.value = ''
    location.reload()
}
</script>
