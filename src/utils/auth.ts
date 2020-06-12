
export const setLogin = (data: object) => {
    localStorage.setItem('login_data', JSON.stringify(data))
    localStorage.setItem('isLogin', "true")
}

export const isLogin = (): boolean => {
    return localStorage.getItem('isLogin') === 'true' ? true : false
}

export const getLoginInfo = (): object => {
    return JSON.parse(localStorage.get('login_data')) || {}
}

export const logOut = () => {
    localStorage.setItem('login_data', '')
    localStorage.setItem('isLogin', "false")
}