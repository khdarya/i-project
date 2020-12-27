import {instance} from "./instance";

export const registrationAPI = {
    sendNewRegistration(email: string, password: string) {
        return instance.post(`/auth/register`, {email, password})
            .then(res => res.data)
    }
}
