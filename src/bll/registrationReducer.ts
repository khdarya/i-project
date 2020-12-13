import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {Dispatch} from "react";
import {registrationAPI} from "../dal/api";

export enum ACTIONS_TYPE {
    SUCCESSFULLY_REGISTERED = 'Registration/SUCCESSFULLY_REGISTERED',
    ERROR = 'Registration/ERROR'
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
type ThunkType = ThunkAction<void, AppStoreType, Dispatch<ActionsType>, ActionsType>

export const registerUser = (email: string, password: string, confirmPassword: string): ThunkType => (dispatch) => {
    registrationAPI.sendNewRegistration(email, password)
        .then(res => {
            if( password !== confirmPassword )
                dispatch (errorAC("The passwords you entered do not match"))
            else {
                dispatch(registrationAC(true))
                console.log(res)
            }

        })
        .catch((error) => {
            errorAC(error)
        })

}




