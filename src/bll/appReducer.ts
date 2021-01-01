import {Dispatch} from "react";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {fetchProfileTC} from "./profileReducer";

export enum ACTIONS_TYPE {
    SET_INITIALIZED = 'Login/SET_INITIALIZED',
    SET_STATUS = 'Login/SET_STATUS',
    SET_SUCCESS_MESSAGE = 'Login/SET_SUCCESS_MESSAGE',
    SET_ERROR_MESSAGE = 'Login/SET_ERROR_MESSAGE'
}

const initState: InitStateType = {
    initialized: false,
    success: true,
    isSuccess: false,
    isError: null
}

export const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {

    console.log(action.type)
    switch (action.type) {
        case ACTIONS_TYPE.SET_INITIALIZED: {
            return {...state, initialized: action.value}
        }
        case ACTIONS_TYPE.SET_STATUS: {
            return {...state, success: action.success}
        }
        case ACTIONS_TYPE.SET_SUCCESS_MESSAGE: {
            return {...state, isSuccess: action.isSuccess}
        }
        case ACTIONS_TYPE.SET_ERROR_MESSAGE: {
            console.log("erorrr")
            return {...state, isError: action.isError}
        }

        default:
            return state
    }
};
export const initializedSuccessAC = (value: boolean) => {
    return {type: ACTIONS_TYPE.SET_INITIALIZED, value} as const
}

export const initializeApp = (): ThunkType => (dispatch: Dispatch<ActionsType>) => {
    const promise = dispatch(fetchProfileTC())
    Promise.all([promise])
        .then(() => {
                dispatch(initializedSuccessAC(true))
            }
        )
}

export const setAppStatusAC = (success: boolean) => {
    return {type: ACTIONS_TYPE.SET_STATUS, success} as const
}
export const setSuccessMessage = (isSuccess: boolean) => {
    return {type: ACTIONS_TYPE.SET_SUCCESS_MESSAGE, isSuccess} as const
}
export const setErrorMessage = (isError: string | null) => {
    return {type: ACTIONS_TYPE.SET_ERROR_MESSAGE, isError} as const
}

type InitStateType = {
    initialized: boolean,
    success: boolean,
    isSuccess: boolean,
    isError: string | null
}
export type SetInitializedType = ReturnType<typeof initializedSuccessAC>
export type SetStatusACType = ReturnType<typeof setAppStatusAC>
export type SetSuccessMessageACType = ReturnType<typeof setSuccessMessage>
export type SetErrorMessageACType = ReturnType<typeof setErrorMessage>
type ThunkType = ThunkAction<void, AppStoreType, Dispatch<ActionsType>, ActionsType>
type ActionsType = SetInitializedType | SetStatusACType | SetSuccessMessageACType | SetErrorMessageACType | any