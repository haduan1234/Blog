
const USER_KEY = "user"

export const setUser = (user) => {
    let userJson = JSON.stringify(user);
    localStorage.setItem(USER_KEY, userJson)
}

export const getUser = () => {
    let user = localStorage.getItem(USER_KEY)
    if (!!user) {
        return JSON.parse(user)
    }
    return null
}

export const clearUser = () => {
    localStorage.removeItem(USER_KEY)
}
