import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {Dispatch} from "react";
import {isRequestInProgress, isRequestSuccess, RequestActionCreatorsType, setResponseErrorText} from "./requestReducer";
import {passwordAPI} from "../dal/password-api";

enum ACTIONS_TYPE {
    CHANGE_NEW_INPUT_PASS = 'NewPass/CHANGE_NEW_INPUT_PASS',
}

type NewPasswordStateType = {
    password: string

}
const initState: NewPasswordStateType = {
    password: '',
}

export const newPasswordReducer = (state: NewPasswordStateType = initState, action: NewPasswordActionCreatorsType): NewPasswordStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.CHANGE_NEW_INPUT_PASS: {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}

// actions
export const changeNewInputPass = (text: string) => {
    return {
        type: ACTIONS_TYPE.CHANGE_NEW_INPUT_PASS,
        payload: {password: text}
    }
}

// types
export type ChangeNewInputPassACType = ReturnType<typeof changeNewInputPass>
export type NewPasswordActionCreatorsType = ChangeNewInputPassACType | RequestActionCreatorsType
export type ThunkType = ThunkAction<void, AppStoreType, Dispatch<NewPasswordActionCreatorsType>, NewPasswordActionCreatorsType>

// thunks
export const sendNewPass = (id: string): ThunkType => {
    return (dispatch, getState) => {
        const password = getState().newPassword.password
        dispatch(isRequestInProgress(true))
        dispatch(setResponseErrorText(null, 'NewPassword'))
        passwordAPI.setNewPassword(password, id)
            .then(() => {
                dispatch(isRequestSuccess(true))
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setResponseErrorText(error, 'NewPassword'))
            })
            .finally(() => dispatch(isRequestInProgress(false)))
    }
}
