enum ACTIONS_TYPE {
    IS_REQUEST_IN_PROGRESS = 'Recovery/IS_REQUEST_IN_PROGRESS',
    IS_REQUEST_SUCCESS = 'Request/IS_REQUEST_SUCCESS',
    SET_RESPONSE_ERROR_TEXT = 'Request/SET_RESPONSE_ERROR_TEXT',
}

export type ResponseErrorType = {
    text: string | null
    inComponent: string | null
}
type RecoveryStateType = {
    isRequestInProgress: boolean
    isRequestSuccess: boolean
    responseError: ResponseErrorType
}
const initState: RecoveryStateType = {
    isRequestInProgress: false,
    isRequestSuccess: false,
    responseError: {
        text: null,
        inComponent: null
    }

}

export const requestReducer = (state: RecoveryStateType = initState, action: RequestActionCreatorsType): RecoveryStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_RESPONSE_ERROR_TEXT: {
            return {
                ...state,
                responseError: {
                    ...state.responseError,
                    ...action.payload
                }
            }
        }
        case ACTIONS_TYPE.IS_REQUEST_IN_PROGRESS:
        case ACTIONS_TYPE.IS_REQUEST_SUCCESS: {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}

// actions
export const isRequestInProgress = (flag: boolean) => {
    return {
        type: ACTIONS_TYPE.IS_REQUEST_IN_PROGRESS,
        payload: { isRequestInProgress: flag }
    }
}
export const isRequestSuccess = (flag: boolean) => {
    return {
        type: ACTIONS_TYPE.IS_REQUEST_SUCCESS,
        payload: { isRequestSuccess: flag }
    }
}
export const setResponseErrorText = (text: string | null, inComponent: string | null) => {
    return {
        type: ACTIONS_TYPE.SET_RESPONSE_ERROR_TEXT,
        payload: { text, inComponent }
    }
}

// types
type SetSendRequestACType = ReturnType<typeof isRequestInProgress>
type SetSendEmailSuccessTextACType = ReturnType<typeof isRequestSuccess>
type SetErrorTextACType = ReturnType<typeof setResponseErrorText>
export type RequestActionCreatorsType = SetErrorTextACType
    | SetSendEmailSuccessTextACType
    | SetSendRequestACType

