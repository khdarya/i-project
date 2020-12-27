import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {Dispatch} from "react";
import {isRequestInProgress, isRequestSuccess, RequestActionCreatorsType, setResponseErrorText} from "./requestReducer";
import {packsApi} from "../dal/packs-api";

enum ACTIONS_TYPE {
    SET_PACKS = 'Cards/SET_PACKS',
    SET_MY_ID = 'Cards/SET_MY_ID',
    SET_IS_LOADING_PACKS_DATA = 'Cards/SET_IS_LOADING_PACKS_DATA',
    PAGE_SIZE = 'Cards/PAGE_SIZE',
    CURRENT_PAGE = 'Cards/CURRENT_PAGE',
    TOTAl_COUNT = 'Cards/TOTAl_COUNT',
}

export type PackType = {
    cardsCount: number | null
    created: Date | null
    deckCover: string | null
    grade: number | null
    more_id: string | null
    name: string | null
    path: string | null
    private: boolean
    rating: number | null
    shots: number | null
    type: string | null
    updated: Date | null
    user_id: string | null
    user_name: string | null
    __v: number | null
    _id: string | null
}
export type PacksType = {
    cardPacks: Array<PackType>
    myID: string | null
    isLoadingPacksData: boolean
    currentPage: number
    pageSize: number
    totalCount: number | null
}
const initState: PacksType = {
    cardPacks: [
        {
            cardsCount: null,
            created: null,
            deckCover: null,
            grade: null,
            more_id: null,
            name: null,
            path: null,
            private: false,
            rating: null,
            shots: null,
            type: null,
            updated: null,
            user_id: null,
            user_name: null,
            __v: null,
            _id: null,
        },
    ],
    myID: null,
    isLoadingPacksData: true,
    currentPage: 1,
    pageSize: 10,
    totalCount: 0
}

export const packsReducer = (state: PacksType = initState, action: PacksActionCreatorsType): PacksType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_PACKS: {
            return {
                ...state,
                cardPacks: [...action.payload]
            }
        }
        case ACTIONS_TYPE.SET_MY_ID: {
            return {
                ...state,
                myID: action.myID
            }
        }
        case ACTIONS_TYPE.SET_IS_LOADING_PACKS_DATA: {
            return {
                ...state,
                isLoadingPacksData: action.isLoadingPacksData
            }
        }
        case ACTIONS_TYPE.CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case ACTIONS_TYPE.TOTAl_COUNT: {
            return {...state, totalCount: action.totalCount}
        }
        default:
            return state
    }
}

// actions
export const setPacks = (packs: Array<PackType>) => {
    return {
        type: ACTIONS_TYPE.SET_PACKS,
        payload: packs
    } as const
}
export const setMyID = (myID: string | null) => {
    return {
        type: ACTIONS_TYPE.SET_MY_ID,
        myID
    } as const
}
export const setIsLoadingPacksData = (isLoadingPacksData: boolean) => {
    return {
        type: ACTIONS_TYPE.SET_IS_LOADING_PACKS_DATA,
        isLoadingPacksData
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: ACTIONS_TYPE.CURRENT_PAGE, currentPage
    } as const
}
export const setTotalCounts = (totalCount: number | null) => {
    return {
        type: ACTIONS_TYPE.TOTAl_COUNT, totalCount
    } as const
}

// types
export type SetPacksACType = ReturnType<typeof setPacks>
export type SetMyIDACType = ReturnType<typeof setMyID>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPage>
export type SetTotalCountsACType = ReturnType<typeof setTotalCounts>
export type SetIsLoadingPacksDataACType = ReturnType<typeof setIsLoadingPacksData>
export type ThunkType = ThunkAction<void, AppStoreType, Dispatch<PacksActionCreatorsType>, PacksActionCreatorsType>
export type PacksActionCreatorsType = SetPacksACType
    | SetMyIDACType | RequestActionCreatorsType | SetIsLoadingPacksDataACType
    | SetCurrentPageACType | SetTotalCountsACType

// thunks
export const getPacksTC = (): ThunkType => {
    return (dispatch, getState) => {
        const params = {
            userId: getState().packs.myID,
            packName: getState().search.searchByName,
            min: getState().search.minCount,
            max: getState().search.maxCount,
            sortPacks: '0updated',
            page: getState().packs.currentPage,
            pageCount: getState().packs.pageSize,
        }
        dispatch(isRequestInProgress(true))
        packsApi.getPacks(params)
            .then(response => {
                dispatch(setPacks(response.cardPacks))
                dispatch(setTotalCounts(response.cardPacksTotalCount))
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
            })
            .finally(() => {
                dispatch(isRequestInProgress(false))
            })
    }
}

export const addPackTC = (): ThunkType => {
    return (dispatch, getState) => {
        const newPack = {
            // name: 'new pack',
            // path: 'string',
            // grade: 0,
            // shots: 0,
            // rating: 0,
            // deckCover: 'string',
            // private: false,
            // type: 'string'
        }
        dispatch(isRequestInProgress(true))
        packsApi.addPack(newPack)
            .then(response => {
                dispatch(getPacksTC())
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
            })
            .finally(() => dispatch(isRequestInProgress(false)))
    }
}

export const updPackTC = (id: string): ThunkType => {
    return (dispatch, getState) => {
        const newPack = {
            _id: id,
            name: 'UPDATE new pack'
        }
        dispatch(isRequestInProgress(true))
        packsApi.updPack(newPack)
            .then(response => {
                dispatch(getPacksTC())
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
            })
            .finally(() => dispatch(isRequestInProgress(false)))
    }
}

export const delPackTC = (packId: string): ThunkType => {
    return (dispatch, getState) => {
        dispatch(isRequestInProgress(true))
        packsApi.delPack(packId)
            .then(response => {
                dispatch(getPacksTC())
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
            })
            .finally(() => dispatch(isRequestInProgress(false)))
    }
}