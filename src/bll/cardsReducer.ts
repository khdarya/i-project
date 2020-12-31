import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {Dispatch} from "react";
import {isRequestInProgress, isRequestSuccess, RequestActionCreatorsType, setResponseErrorText} from "./requestReducer";
import {cardsApi} from "../dal/cards-api";
import {handleServerNetworkError} from "../utils/error-utils";

enum ACTIONS_TYPE {
    SET_CARDS = 'Cards/SET_CARDS',
    SET_CARDS_PACK_ID = 'Cards/SET_CARDS_PACK_ID',
    SET_IS_LOADING_CARDS_DATA = 'Cards/SET_IS_LOADING_CARDS_DATA',
}

export type CardType = {
    answer: string | null
    question: string | null
    cardsPack_id: string | null
    grade: number | null
    rating: number | null
    shots: number | null
    type: string | null
    user_id: string | null
    created: string | null
    updated: string | null
    __v: number | null
    _id: string | null
}
export type CardsType = {
    cards: Array<CardType>
    cardsPackId: string | null,
    isLoadingCardsData: boolean
}
const initState: CardsType = {
    cards: [
        {
            answer: null,
            question: null,
            cardsPack_id: null,
            grade: null,
            rating: null,
            shots: null,
            type: null,
            user_id: null,
            created: null,
            updated: null,
            __v: null,
            _id: null,
        },
    ],
    cardsPackId: null,
    isLoadingCardsData: true
}

export const cardsReducer = (state: CardsType = initState, action: CardsActionCreatorsType): CardsType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_CARDS: {
            return {
                ...state,
                cards: [...action.payload]
            }
        }
        case ACTIONS_TYPE.SET_CARDS_PACK_ID: {
            return {
                ...state,
                cardsPackId: action.cardsPackId
            }
        }
        case ACTIONS_TYPE.SET_IS_LOADING_CARDS_DATA: {
            return {
                ...state,
                isLoadingCardsData: action.isLoadingCardsData
            }
        }
        default:
            return state
    }
}

// actions
export const setCards = (cards: Array<CardType>) => {
    return {
        type: ACTIONS_TYPE.SET_CARDS,
        payload: cards
    } as const
}
export const setCardPackId = (cardsPackId: string | null) => {
    return {
        type: ACTIONS_TYPE.SET_CARDS_PACK_ID,
        cardsPackId
    } as const
}
export const setIsLoadingCardsData = (isLoadingCardsData: boolean) => {
    return {
        type: ACTIONS_TYPE.SET_IS_LOADING_CARDS_DATA,
        isLoadingCardsData
    } as const
}

// types
export type SetCardsACType = ReturnType<typeof setCards>
export type SetCardPackIdACType = ReturnType<typeof setCardPackId>
export type SetIsLoadingCardsDataACType = ReturnType<typeof setIsLoadingCardsData>
export type ThunkType = ThunkAction<void, AppStoreType, Dispatch<CardsActionCreatorsType>, CardsActionCreatorsType>
export type CardsActionCreatorsType = SetCardsACType | SetCardPackIdACType | RequestActionCreatorsType | SetIsLoadingCardsDataACType

// thunks
export const getCardsTC = (): ThunkType => {
    return (dispatch, getState) => {
        const params = {
            cardsPack_id: getState().cards.cardsPackId,
            cardAnswer: '',
            cardQuestion: '',
            // min: 1,
            // max: 4,
            // sortCards: '0grade',
            page: 1,
            pageCount: 20,
        }
        dispatch(isRequestInProgress(true))
        dispatch(setIsLoadingCardsData(true))
        cardsApi.getCards(params)
            .then(res => {
                dispatch(setCards(res.cards))
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
            })
            .finally(() => {
                dispatch(isRequestInProgress(false))
                dispatch(setIsLoadingCardsData(false))
            })
    }
}

export const addCardTC = (): ThunkType => {
    return (dispatch, getState) => {
        const newCard = {
            cardsPack_id: getState().cards.cardsPackId,
            // question: 'question',
            // answer: 'answer',
            // grade: 0,
            // shots: 0,
            // rating: 0,
            // answerImg: 'answerImg',
            // questionImg: 'questionImg',
            // questionVideo: 'questionVideo',
            // answerVideo: 'answerVideo',
            // type: 'type'
        }
        dispatch(isRequestInProgress(true))
        cardsApi.addCard(newCard)
            .then(() => {
                dispatch(getCardsTC())
            })
            .catch(e => {
                // const error = e.response
                //     ? e.response.data.error
                //     : (e.message + ', more details in the console');
                handleServerNetworkError(e, dispatch)
            })
            .finally(() => dispatch(isRequestInProgress(false)))
    }
}

export const updCardTC = (id: string): ThunkType => {
    return (dispatch, getState) => {
        const newCard = {
            _id: id,
            question: 'UPDATE question'
        }
        dispatch(isRequestInProgress(true))
        cardsApi.updCard(newCard)
            .then(() => {
                dispatch(getCardsTC())
            })
            .catch(error => {
              //debugger
                handleServerNetworkError(error, dispatch)
            })
            .finally(() => dispatch(isRequestInProgress(false)))
    }
}

export const delCardTC = (cardId: string): ThunkType => {
    return (dispatch, getState) => {
        dispatch(isRequestInProgress(true))
        cardsApi.delCard(cardId)
            .then(() => {
                dispatch(getCardsTC())
            })
            .catch(e => {
                // const error = e.response
                //     ? e.response.data.error
                //     : (e.message + ', more details in the console');
                handleServerNetworkError(e, dispatch)
            })
            .finally(() => dispatch(isRequestInProgress(false)))
    }
}