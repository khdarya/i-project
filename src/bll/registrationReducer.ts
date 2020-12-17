import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {Dispatch} from "react";
import {registrationAPI} from "../dal/api";
import {isRequestInProgress, RequestActionCreatorsType, setResponseErrorText} from "./requestReduced";

export enum ACTIONS_TYPE {
    SUCCESSFULLY_REGISTERED = 'Registration/SUCCESSFULLY_REGISTERED',
    ERROR = 'Registration/ERROR',

}

export type RegistrationType = {
    isRegistered: boolean
    error: string
}
const initState: RegistrationType = {
    isRegistered: false,
    error: ''
}

export const registrationReducer = (state: RegistrationType = initState, action: ActionsType): RegistrationType => {
    switch (action.type) {
        case ACTIONS_TYPE.SUCCESSFULLY_REGISTERED: {
            return {
                ...state,
                isRegistered: action.isRegistered
            }
        }
        case ACTIONS_TYPE.ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        default:
            return state
    }
}
//actions
type ActionsType = RegistrationACType | ErrorACType

export type RegistrationACType = {
    type: ACTIONS_TYPE.SUCCESSFULLY_REGISTERED,
    isRegistered: boolean
}
export type ErrorACType = {
    type: ACTIONS_TYPE.ERROR,
    error: string
}


export const registrationAC = (isRegistered: boolean) =>
    ({type: ACTIONS_TYPE.SUCCESSFULLY_REGISTERED, isRegistered} as const)

export const errorAC = (error: string) =>
    ({type: ACTIONS_TYPE.ERROR, error} as const)


//thunk
export type ThunkType = ThunkAction<void, AppStoreType, Dispatch<ActionsType | RequestActionCreatorsType> , ActionsType | RequestActionCreatorsType>

export const registerUser = (email: string, password: string, confirmPassword: string): ThunkType => (dispatch) => {

    dispatch(isRequestInProgress(true))
    dispatch(setResponseErrorText(null, 'Registration'))

    registrationAPI.sendNewRegistration(email, password)
        .then(response => {
            dispatch(registrationAC(true))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in console');
            dispatch(errorAC(error))
            dispatch(setResponseErrorText(error, 'Registration'))

        })
        .finally(() => dispatch(isRequestInProgress(false)))
}




