export enum ACTIONS_TYPE {
    LOGIN_TEMP = 'Login/LOGIN_TEMP',
}

export type LoginType = {}
const initState: LoginType = {}

export const loginReducer = (state: LoginType = initState, action: any): LoginType => {
    switch (action.type) {
        case ACTIONS_TYPE.LOGIN_TEMP: {
            return {...state}
        }
        default: return state
    }
};