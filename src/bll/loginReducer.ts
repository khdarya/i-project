import {authAPI} from "../dal/api";
import {Dispatch} from "react";
import {setUserProfile, SetUserProfileActionType} from "./profileReducer";
import {isRequestInProgress, SetErrorTextACType, setResponseErrorText, SetSendRequestACType} from "./requestReduced";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";

export enum ACTIONS_TYPE {
    SET_IS_LOGGED_IN = 'Login/SET_IS_LOGGED_IN',
    SET_IS_LOGGED_OUT = 'Login/SET_IS_LOGGED_OUT',
}

const initState: InitStateType = {
    isLoggedIn: false,
}

export const loginReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_IS_LOGGED_IN: {
            return {...state, isLoggedIn: action.value}
        }
        case ACTIONS_TYPE.SET_IS_LOGGED_OUT: {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
};
export const setIsLoggedInAC = (value: boolean) => {
    return {type: ACTIONS_TYPE.SET_IS_LOGGED_IN, value} as const
}
export const setIsLoggedOutAC = (value: boolean) => {
    return {type: ACTIONS_TYPE.SET_IS_LOGGED_OUT, value} as const
}
export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch: Dispatch<ActionsType>) => {

    dispatch(isRequestInProgress(true))
    authAPI.login(email, password, rememberMe)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserProfile(res.data))
            dispatch(setResponseErrorText(null, 'LoginContainer'))
        }).catch(e => {
        const error = e.response ? e.response.data.error : (e.message + `, more details in the console`)
        dispatch(setResponseErrorText(error, 'LoginContainer'))
    }).finally(() => dispatch(isRequestInProgress(false)))
}

export const logoutTC = (): ThunkType => (dispatch) => {
    dispatch(isRequestInProgress(true))
    authAPI.logout()
        .then(() => {
            dispatch(setIsLoggedOutAC(false))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + `, more details in the console`)
            console.error(error)
        })
        .finally(() => dispatch(isRequestInProgress(false)))
}

type InitStateType = {
    isLoggedIn: boolean
}
export type LoginType = ReturnType<typeof setIsLoggedInAC>
type ThunkType = ThunkAction<void, AppStoreType, Dispatch<ActionsType>, ActionsType>
type LogOutType = ReturnType<typeof setIsLoggedOutAC>
type ActionsType = LoginType | LogOutType | SetUserProfileActionType | SetSendRequestACType | SetErrorTextACType