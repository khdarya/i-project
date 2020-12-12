import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {Dispatch} from "react";
import {passwordAPI} from "../dal/api";

export enum ACTIONS_TYPE {
    CHANGE_INPUT_PASS = 'Recovery/CHANGE_INPUT_PASS',
}

export type PasswordType = {
    email: string
}
const initState: PasswordType = {
    email: ''
}

export const recoveryPasswordReducer = (state: PasswordType = initState, action: RecoveryPasswordActionCreatorsType): PasswordType => {
    switch (action.type) {
        case ACTIONS_TYPE.CHANGE_INPUT_PASS: {
            return {
                ...state,
                email: action.payload
            }
        }
        default:
            return state
    }
}

// actions
type ChangeInputPassACType = {
    type: ACTIONS_TYPE.CHANGE_INPUT_PASS
    payload: string
}
export const changeInputPass = (text: string): ChangeInputPassACType => {
    return {
        type: ACTIONS_TYPE.CHANGE_INPUT_PASS,
        payload: text
    }
}

// types
type ThunkType = ThunkAction<void, AppStoreType, Dispatch<RecoveryPasswordActionCreatorsType>, RecoveryPasswordActionCreatorsType>
export type RecoveryPasswordActionCreatorsType = ChangeInputPassACType

// thunks
export const forgotPass = (): ThunkType => {
    return (dispatch, getState) => {
        const email = getState().recoveryPassword.email
        const from = `test-front-admin <sergei.shaporov@gmail.com>`
        const message = `<div style="background-color: lime; padding: 15px">
                                password recovery link: 
                                <a href='http://localhost:3000/#/newpass/$token$'>link</a>
                         </div>`
        passwordAPI.sendForgotData(email, from, message)
            .then(responseData => {
                console.log(responseData)
            })
    }
}

