import {instance} from "./instance";

export const passwordAPI = {
    sendForgotData(emailTemplate: {email: string, from: string, message: string}) {
        return instance.post(`/auth/forgot`, emailTemplate)
            .then(res => res)
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post(`/auth/set-new-password`, {password, resetPasswordToken})
            .then(res => res)
    }
}