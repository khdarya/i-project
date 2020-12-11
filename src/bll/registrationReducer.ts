export enum ACTIONS_TYPE {
    REGISTRATION_TEMP = 'Registration/REGISTRATION_TEMP',
}

export type RegistrationType = {}
const initState: RegistrationType = {}

export const registrationReducer = (state: RegistrationType = initState, action: any): RegistrationType => {
    switch (action.type) {
        case ACTIONS_TYPE.REGISTRATION_TEMP: {
            return {...state}
        }
        default: return state
    }
}