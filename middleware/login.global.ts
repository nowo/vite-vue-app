export default defineNuxtRouteMiddleware((to, from) => {
    // console.log(to, from)
    // if(process.env.client)
    console.log(process.client)
    if (process.client) {
        const token = useSessionStorage('token', '')
        console.log(token.value)
        if (!token.value && to.name !== 'login') {
            return navigateTo('/login')
        }
    }

    // if (to.name === 'login') {
    //     //
    // } else if (!token.value && to.name !== 'login') {
    //     return navigateTo('/login')
    // }
    // setTimeout(() => {
    //     navigateTo(to)
    // },1000)

    // const auth = useState('auth')

    // if (!auth.value.isAuthenticated) {
    //     return navigateTo('/login')
    // }

    // if (to.path !== '/dashboard') {
    //     return navigateTo('/dashboard')
    // }
})
