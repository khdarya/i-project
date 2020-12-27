import {Dispatch} from "react";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {fetchProfileTC} from "./profileReducer";

export enum ACTIONS_TYPE {
    SET_INITIALIZED = 'Login/SET_INITIALIZED',
}

const initState: InitStateType = {
    initialized: false,
}

export const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_INITIALIZED: {
            return {...state, initialized: action.value}
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

type InitStateType = {
    initialized: boolean
}
export type SetInitializedType = ReturnType<typeof initializedSuccessAC>
type ThunkType = ThunkAction<void, AppStoreType, Dispatch<ActionsType>, ActionsType>
type ActionsType = SetInitializedType | any