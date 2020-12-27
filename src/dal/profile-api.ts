import {instance} from "./instance";

export const profileAPI = {
    getProfile() {
        return instance.post('/auth/me')
    }
}
