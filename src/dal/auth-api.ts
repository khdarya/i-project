import {instance} from "./instance";

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post('/auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('/auth/me')
    }
}

