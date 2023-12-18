<template>
    <div class="h100vh w100% flex items-center justify-center">
        <el-form ref="formRef" :model="form" :rules="rules" size="large" class="login-content-form">
            <el-form-item prop="username" class="login-animation1">
                <el-input ref="userRef" v-model.trim="form.username" placeholder="请输入账号" clearable autocomplete="off"
                    maxlength="20" @keyup.enter="onSignIn">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <!-- <ele-User /> -->
                            <i class="i-ep-user" />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" class="login-animation2">
                <el-input v-model.trim="form.password" type="password" show-password placeholder="请输入密码" autocomplete="off"
                    maxlength="20" @keyup.enter="onSignIn">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <!-- <ele-Unlock /> -->
                            <i class="i-ep-unlock" />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="code" class="login-animation3">
                <el-col :span="15">
                    <el-input v-model.trim="form.code" maxlength="4" placeholder="请输入验证码" clearable autocomplete="off"
                        @keyup.enter="onSignIn">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <!-- <ele-Position /> -->
                                <i class="i-ep-position" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-col>
                <el-col :span="1" />
                <el-col :span="8">
                    <el-button class="login-content-code" @click="getCode">
                        {{ state.verify }}
                    </el-button>
                </el-col>
            </el-form-item>
            <el-form-item class="login-animation4">
                <!-- v-waves -->
                <el-button type="primary" class="login-content-submit" round :loading="state.loading.signIn"
                    @click="onSignIn">
                    <span>登 录</span>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules, InputInstance } from 'element-plus'

// import { Session } from '@/utils/storage'

// import { formatAxis } from '@/utils/common/formatTime'
// import { NextLoading } from '@/utils/loading'

definePageMeta({
    // layout: false,
    layout: 'default',
    title: '登录',
})

// import { ApiCommon } from '@/api/common'
// import { ApiLogin } from '@/api/system/login'

const formRef = ref<FormInstance>()
const userRef = ref<InputInstance>()

const { token } = useUserState()

// 定义变量内容
const route = useRoute()
const router = useRouter()
const state = reactive({
    verify: '',
    session_id: '',
    loading: {
        signIn: false,
    },
})

const form = reactive({
    username: '',
    password: '',
    code: '',
})
const rules = reactive<FormRules>({
    username: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    code: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
    ],
})

// 获取验证码
const getCode = async () => {
    // const res = await ApiCommon.getCode()

    // if (res.code !== 200) return ElMessage.error(res.msg)

    // state.session_id = res.data.session_id
    // state.verify = res.data.validate_code
}

// 时间获取
const currentTime = computed(() => {
    return '上午好'
    // return formatAxis(new Date())
})

// 登录成功后的跳转
const signInSuccess = (isNoPower: boolean | undefined) => {
    if (isNoPower) {
        ElMessage.warning('抱歉，您没有登录权限')
        // Session.clear()
    } else {
        // 初始化登录成功时间问候语
        const currentTimeInfo = currentTime.value
        // 登录成功，跳到转首页
        // 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
        const redirect = route.query?.redirect as string
        if (redirect) {
            router.push({
                path: redirect,
                query: Object.keys(route.query?.params as string).length > 0 ? JSON.parse(route.query?.params as string) : '',
            })
        } else {
            router.push('/')
        }
        // 登录成功提示
        const signInText = '欢迎回来！'
        ElMessage.success(`${currentTimeInfo}，${signInText}`)
        // 添加 loading，防止第一次进入界面时出现短暂空白
        // NextLoading.start()
    }
    state.loading.signIn = false
}

// 登录
const onSignIn = async () => {
    if (state.loading.signIn) return

    // const isVerify = await useFormVerify(formRef.value)

    // if (!isVerify) return

    // state.loading.signIn = true

    // const params: ISystemLoginType = {
    //     session_id: state.session_id,
    //     validate_code: form.code,
    //     account: form.username,
    //     password: form.password,
    // }

    // const res = await ApiLogin.login(params)
    // state.loading.signIn = false
    // if (res.code !== 200) {
    //     return ElMessage.error(res.msg)
    // }

    // // 存储 token 到浏览器缓存
    // Session.set('token', res.data.admin_token)

    // Session.set('token', 111)

    const res = await useFetch('/api/login')

    token.value = '123456000'
    useSessionStorage('token', token.value)

    // 执行完 initFrontEndControlRoutes或者initBackEndControlRoutes，再执行 signInSuccess
    await signInSuccess(false)

    // if (!themeConfig.value.isRequestRoutes) {
    //     // 前端控制路由，2、请注意执行顺序
    //     const isNoPower = await initFrontEndControlRoutes()
    //     signInSuccess(isNoPower)
    // } else {
    //     // 模拟后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
    //     // 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
    //     const isNoPower = await initBackEndControlRoutes()
    //     // 执行完 initBackEndControlRoutes，再执行 signInSuccess
    //     signInSuccess(isNoPower)
    // }
}

onMounted(() => {
    getCode()
    userRef.value?.focus()
})
</script>

<style scoped lang="scss">
.login-content-form {
    // margin-top: 20px;
    width: 400px;

    // @for $i from 1 through 4 {
    //     .login-animation#{$i} {
    //         opacity: 0;
    //         animation-name: error-num;
    //         animation-duration: 0.5s;
    //         animation-fill-mode: forwards;
    //         animation-delay: calc($i/10) + s;
    //     }
    // }

    .login-content-password {
        display: inline-block;
        width: 20px;
        cursor: pointer;

        &:hover {
            color: #909399;
        }
    }

    .login-content-code {
        width: 100%;
        padding: 0;
        font-weight: bold;
        letter-spacing: 5px;
    }

    .login-content-submit {
        width: 100%;
        letter-spacing: 2px;
        font-weight: 300;
        margin-top: 15px;
    }
}
</style>
