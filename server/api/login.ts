export default defineEventHandler(async (event) => {
    // 读取counter cookie
    const token = getCookie(event, 'token') || '4567496789745564'

    // 将counter cookie增加1
    setCookie(event, 'token', token)

    // 发送JSON响应
    return { token }
})
