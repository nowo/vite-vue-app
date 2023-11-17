
const ApiUser = {
    // 获取用户信息
    getUserInfo: () => useRequest('/api/user/getUserInfo', { method: 'get' }),

    // 退出登录
    logout: function () {
        return useRequest('/api/user/logout');
    },

    // 修改用户信息
    updateUserInfo: (data: any) => useRequest('/api/user/updateUserInfo', data),
}