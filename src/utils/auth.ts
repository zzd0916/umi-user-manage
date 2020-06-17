
export const setLogin = (data: object) => {
    localStorage.setItem('AdminLoginData', JSON.stringify(data))
    localStorage.setItem('isLogin', "true")
}

export const isLogin = (): boolean => {
    return localStorage.getItem('isLogin') === 'true' ? true : false
}

export const getLoginInfo = (): object => {
    return JSON.parse(localStorage.get('AdminLoginData')) || {}
}

export const logOut = () => {
    localStorage.setItem('AdminLoginData', '')
    localStorage.setItem('isLogin', "false")
}