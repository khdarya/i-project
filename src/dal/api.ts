import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0',
})

export const passwordAPI = {
    sendForgotData(email: string, from: string, message: string) {
        return instance.post(`/auth/forgot`, {email, from, message})
            .then(res => res.data)
    }
}

export const registrationAPI = {
    sendNewRegistration(email: string, password: string) {
        return instance.post(`/auth/register`, {email, password})
            .then(res => res.data)
    }
}