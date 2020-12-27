import {Dispatch} from "react";
import {setUserProfile, SetUserProfileActionType} from "./profileReducer";
import {isRequestInProgress, SetErrorTextACType, setResponseErrorText, SetSendRequestACType} from "./requestReducer";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {authAPI} from "../dal/auth-api";

export enum ACTIONS_TYPE {
    SET_IS_LOGGED_IN = 'Login/SET_IS_LOGGED_IN',
}
const initState: InitStateType = {
    isLoggedIn: false,
}

export const loginReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_IS_LOGGED_IN: {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
};
export const setIsLoggedInAC = (value: boolean) => {
    return {type: ACTIONS_TYPE.SET_IS_LOGGED_IN, value} as const
}

export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch: Dispatch<ActionsType>) => {
    dispatch(isRequestInProgress(true))
    authAPI.login(email, password, rememberMe)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserProfile(res.data))
            dispatch(setResponseErrorText(null, 'LoginContainer'))
        })
        .catch(e => {
        const error = e.response ? e.response.data.error : (e.message + `, more details in the console`)
        dispatch(setResponseErrorText(error, 'LoginContainer'))
    })
        .finally(() => dispatch(isRequestInProgress(false)))
}

export const logoutTC = (): ThunkType => (dispatch) => {
    dispatch(isRequestInProgress(true))
    authAPI.logout()
        .then(() => {
            dispatch(setIsLoggedInAC(false))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + `, more details in the console`)
        })
        .finally(() => dispatch(isRequestInProgress(false)))
}

type InitStateType = {
    isLoggedIn: boolean
}
export type LoginType = ReturnType<typeof setIsLoggedInAC>
type ActionsType = LoginType | SetUserProfileActionType | SetSendRequestACType | SetErrorTextACType
type ThunkType = ThunkAction<void, AppStoreType, Dispatch<ActionsType>, ActionsType>