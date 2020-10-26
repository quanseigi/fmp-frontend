import axios from 'axios'

const API_URL = 'https://d1uap5y8ankqpj.cloudfront.net/api/user'
export const SESSION_USER_NAME = 'authenticatedUser'
export const SESSION_TOKEN = 'authenticatedToken'

class UserService {

    loginOrRegister(username, password) {
        return axios.post(`${API_URL}/login`, {username: username, password: password})
    }

    logout() {
        sessionStorage.removeItem(SESSION_USER_NAME);
        return axios.get(`${API_URL}/logout`);
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(SESSION_USER_NAME, username);
        token = this.createJWTToken(token);
        sessionStorage.setItem(SESSION_TOKEN, token);
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(SESSION_USER_NAME)
        if (user === null) return false
        return true
    }

    getLoggedUserName() {
        let user = sessionStorage.getItem(SESSION_USER_NAME)
        if (user === null) return ''
        return user
    }
}

export default new UserService() 