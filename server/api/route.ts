export default defineEventHandler(async (event) => {
    return [
        {
            path: '/',
            meta: {
                title: '首页',
                icon: 'i-ep-home-filled',
            },
        },
        {
            path: '/system',
            meta: {
                title: '系统设置',
                icon: 'i-ep-setting',
            },
        },
    ]
})
