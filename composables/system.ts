/**
 * 设置用户登录信息，token相关
 * @returns
 */
export const useUserState = () => {
    // const token = useState<string>('token', () => {
    //     return process.client ? useSessionStorage('token', '') : ''
    // })
    const token = useCookie('token')

    const userInfo = useState<any>('userInfo', () => ({}))

    const setToken = (token: string) => {
        useSessionStorage('token', token)
        userInfo.value = {}
    }

    return {
        token,
        userInfo,
    }
}

export const usePermissionState = () => {
    // 菜单列表
    const menuList = useState<any[]>('menuList', () => [])

    // 处理成平级的菜单列表（方便后续使用）
    const authRoutes = computed(() => menuList.value)

    /**
     * 请求路由数据
     */
    const getAuthMenu = async () => {
        const a = useUserState()
        if (!a.token.value) return []
        const { data } = await useFetch('/api/route')
        menuList.value = data.value || []
        return data
    }

    return {
        menuList,
        authRoutes,
        getAuthMenu,
    }
}
