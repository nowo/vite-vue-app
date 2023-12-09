const whiteList = ['/', '/doc/*']
export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log(process.client)
    const { token } = useUserState()
    const { menuList, getAuthMenu } = usePermissionState()
    await getAuthMenu()

    if (menuList.value.length) { // 有用户路由时
        const currentItem = menuList.value.find(item => item.path === to.path)
        // console.log(currentItem)
        // if (!currentItem) return abortNavigation('无权访问')  // 阻止跳转

        if (currentItem) {
            to.meta.title = `${currentItem.meta.title}aa`
        } else {
            // return navigateTo('/', { redirectCode: 301 })
        }

        // if (process.client) {
        //     const token = useSessionStorage('token', '')
        //     console.log(token.value)
        //     console.log('to', to.path)
        //     if (!token.value && to.path !== '/login') {
        //         return navigateTo('/login')
        //     } else {
        //         // const currentItem = menuList.value.find(item => item.path === to.path)
        //         // console.log(currentItem)
        //         // // if (!currentItem) return abortNavigation('无权访问')  // 阻止跳转

        //         // if (!currentItem) return navigateTo('/', { redirectCode: 301 })
        //     }
        // }
    } else {
        if (!token.value && to.path !== '/login') {
            return navigateTo('/login')
        }
    }

    // const auth = useState('auth')

    // if (!auth.value.isAuthenticated) {
    //     return navigateTo('/login')
    // }

    // if (to.path !== '/dashboard') {
    //     return navigateTo('/dashboard')
    // }
})
