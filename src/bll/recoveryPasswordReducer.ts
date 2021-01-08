import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {Dispatch} from "react";
import {isRequestInProgress, isRequestSuccess, RequestActionCreatorsType, setResponseErrorText} from "./requestReducer";
import {passwordAPI} from "../dal/password-api";

enum ACTIONS_TYPE {
    CHANGE_INPUT_EMAIL = 'Recovery/CHANGE_INPUT_EMAIL',
}

type RecoveryStateType = {
    email: string
}
const initState: RecoveryStateType = {
    email: '',
}

export const recoveryPasswordReducer = (state: RecoveryStateType = initState, action: RecoveryPasswordActionCreatorsType): RecoveryStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.CHANGE_INPUT_EMAIL: {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}

// actions
export const changeInputEmail = (text: string) => {
    return {
        type: ACTIONS_TYPE.CHANGE_INPUT_EMAIL,
        payload: { email: text }
    }
}

// types
type ChangeInputPassACType = ReturnType<typeof changeInputEmail>
export type RecoveryPasswordActionCreatorsType = ChangeInputPassACType | RequestActionCreatorsType
export type ThunkType = ThunkAction<void, AppStoreType, Dispatch<RecoveryPasswordActionCreatorsType>, RecoveryPasswordActionCreatorsType>

// thunks
export const forgotPass = (): ThunkType => {
    return (dispatch, getState) => {
        const emailTemplate = {
            email: getState().recoveryPassword.email,
            from: `test-front-admin <sergei.shaporov@gmail.com>`,
            message: `<div style="background-color: lime; padding: 15px">
                                password recovery link: 
                                <a href='https://sshaporov.github.io/friday/#/newpass/$token$'>link</a>
                         </div>`
        }
        dispatch(isRequestInProgress(true))
        dispatch(setResponseErrorText(null, 'RecoveryPassword'))
        passwordAPI.sendForgotData(emailTemplate)
            .then(() => {
                dispatch(isRequestSuccess(true))
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setResponseErrorText(error, 'RecoveryPassword'))
            })
            .finally(() => dispatch(isRequestInProgress(false)))
    }
}