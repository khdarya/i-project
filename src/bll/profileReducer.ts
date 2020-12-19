import {Dispatch} from "react";
import {profileAPI} from "../dal/api";
import {LoginType, setIsLoggedInAC, setIsLoggedOutAC} from "./loginReducer";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";

export enum ACTIONS_TYPE {
    SET_USER_PROFILE = 'Profile/SET_USER_PROFILE',
}

const initState: ProfileInitialStateType = {
    profile: {
        name: '',
        _id: '',
        avatar: '',
        created: '',
        updated: '',
        email: '',
        isAdmin: false,
        publicCardPacksCount: 0,
        rememberMe: false,
        verified: false,
        error: ''
    }
}

export const profileReducer = (state: ProfileInitialStateType = initState, action: ActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_USER_PROFILE:
            return {...state, profile: action.payload}
        default:
            return state
    }
}

export const setUserProfile = (payload: ProfileType) => {
    return {
        type: ACTIONS_TYPE.SET_USER_PROFILE,
        payload
    } as const
}

export const fetchProfileTC = (): ThunkType => (dispatch) => {
    profileAPI.getProfile()
        .then(res => {
            if (res.status === 200) {
                dispatch(setUserProfile(res.data))
                dispatch(setIsLoggedInAC(true))
            }
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + `, more details in the console`)
            console.log('Error: ', {...e})
            setIsLoggedOutAC(false)
        })
}
export type ProfileType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error: string
}
export type ProfileInitialStateType = {
    profile: ProfileType
}
type ThunkType = ThunkAction<void, AppStoreType, Dispatch<ActionsType>, ActionsType>
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
type ActionsType = SetUserProfileActionType | LoginType