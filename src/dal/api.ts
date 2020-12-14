import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0',
})

export const passwordAPI = {
    sendForgotData(email: string, from: string, message: string) {
        return instance.post(`/auth/forgot`, {email, from, message})
            .then(res => res)
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post(`/auth/set-new-password`, {password, resetPasswordToken})
            .then(res => res)
    }
}

export const registrationAPI = {
    sendNewRegistration(email: string, password: string) {
        return instance.post(`/auth/register`, {email, password})
            .then(res => res.data)
    }
}