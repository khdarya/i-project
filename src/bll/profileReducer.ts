export enum ACTIONS_TYPE {
    PROFILE_TEMP = 'Profile/PROFILE_TEMP',
}

export type ProfileType = {}
const initState: ProfileType = {}

export const profileReducer = (state: ProfileType = initState, action: any): ProfileType => {
    switch (action.type) {
        case ACTIONS_TYPE.PROFILE_TEMP: {
            return {...state}
        }
        default: return state
    }
}