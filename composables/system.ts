/**
 * 设置用户登录信息，token相关
 * @returns
 */
export const useUserState = () => {
    const token = useState<string>('token', () => '')

    const userInfo = useState<any>('userInfo', () => ({}))

    return {
        token,
        userInfo,
    }
}
