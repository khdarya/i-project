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
    UPDATE_GRADE = 'Cards/UPDATE_GRADE',
}

export type CardType = {
    answer: string | null
    question: string | null
    cardsPack_id: string | null
    grade: number
    rating: number | null
    shots: number
    type: string | null
    user_id: string | null
    created: string | null
    updated: string | null
    __v: number | null
    _id: string
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
            grade: 0,
            rating: null,
            shots: 0,
            type: null,
            user_id: null,
            created: null,
            updated: null,
            __v: null,
            _id: "",
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
        case ACTIONS_TYPE.UPDATE_GRADE: {
            return {
                ...state,
                cards: state.cards.map(c => {
                    if (c._id === action.id) {
                        return {
                            ...c,
                            grade: action.grade,
                            shots: action.shots
                        }
                    } else return c
                })
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
export const updateGradeAC = (grade: number, shots: number, id: string) => {
    return {
        type: ACTIONS_TYPE.UPDATE_GRADE,
        grade, shots, id
    } as const
}

// types
export type SetCardsACType = ReturnType<typeof setCards>
export type SetCardPackIdACType = ReturnType<typeof setCardPackId>
export type SetIsLoadingCardsDataACType = ReturnType<typeof setIsLoadingCardsData>
export type UpdateGradeACType = ReturnType<typeof updateGradeAC>
export type ThunkType = ThunkAction<void, AppStoreType, Dispatch<CardsActionCreatorsType>, CardsActionCreatorsType>
export type CardsActionCreatorsType =
    SetCardsACType
    | SetCardPackIdACType
    | RequestActionCreatorsType
    | SetIsLoadingCardsDataACType
    | UpdateGradeACType

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

export const addCardTC = (value:string): ThunkType => {
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
            answer: value
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
export const updateGradeTC = (cardId: string, grade: number): ThunkType => (dispatch) => {
    dispatch(isRequestInProgress(true))
    cardsApi.updGrade(grade, cardId)
        .then(res => {
            dispatch(updateGradeAC(res.data.updatedGrade.grade, res.data.updatedGrade.shots, res.data.updatedGrade.card_id))
            //console.log(res)
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
        })
        .finally(() => dispatch(isRequestInProgress(false)))
}