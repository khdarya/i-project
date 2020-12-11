export enum ACTIONS_TYPE {
    PASSWORD_TEMP = 'Password/PASSWORD_TEMP',
}

export type PasswordType = {}
const initState: PasswordType = {}

export const passwordReducer = (state: PasswordType = initState, action: any): PasswordType => {
    switch (action.type) {
        case ACTIONS_TYPE.PASSWORD_TEMP: {
            return {...state}
        }
        default: return state
    }
}