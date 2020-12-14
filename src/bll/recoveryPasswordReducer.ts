import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {Dispatch} from "react";
import {passwordAPI} from "../dal/api";
import {isRequestInProgress, isRequestSuccess, RequestActionCreatorsType, setResponseErrorText} from "./requestReduced";

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
export type RecoveryPasswordActionCreatorsType = ChangeInputPassACType
export type ThunkType = ThunkAction<void, AppStoreType, Dispatch<RecoveryPasswordActionCreatorsType | RequestActionCreatorsType>, RecoveryPasswordActionCreatorsType | RequestActionCreatorsType>

// thunks
export const forgotPass = (): ThunkType => {
    return (dispatch, getState) => {
        const email = getState().recoveryPassword.email
        const from = `test-front-admin <sergei.shaporov@gmail.com>`
        const message = `<div style="background-color: lime; padding: 15px">
                                password recovery link: 
                                <a href='http://localhost:3000/#/newpass/$token$'>link</a>
                         </div>`
        dispatch(isRequestInProgress(true))
        dispatch(setResponseErrorText(null, 'RecoveryPassword'))

        passwordAPI.sendForgotData(email, from, message)
            .then(response => {
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
