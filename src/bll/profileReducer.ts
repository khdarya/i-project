import {Dispatch} from "react";
import {
    LoginType,
    setIsLoggedInAC,
} from "./loginReducer";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {profileAPI} from "../dal/profile-api";

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
   return profileAPI.getProfile()
        .then(res => {
                dispatch(setUserProfile(res.data))
                dispatch(setIsLoggedInAC(true))
        })
        .catch(e => {
            dispatch(setIsLoggedInAC(false))
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

type ThunkType = ThunkAction<Promise<void>, AppStoreType, Dispatch<ActionsType>, ActionsType>
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
type ActionsType = SetUserProfileActionType | LoginType