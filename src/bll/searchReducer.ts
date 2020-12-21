export enum ACTIONS_TYPE {
    SEARCH_BY_NAME = 'Search/SEARCH_BY_NAME',
    RANGE_MIN_MAX_COUNT = 'Search/RANGE_MIN_MAX_COUNT'

}

export type SearchType = {
    minCount: number
    maxCount: number
    searchByName: string

}
const initState: SearchType = {
    minCount: 0,
    maxCount: 4,
    searchByName: ''
}

export const searchReducer = (state: SearchType = initState, action: ActionsType): SearchType => {
    switch (action.type) {
        case ACTIONS_TYPE.SEARCH_BY_NAME: {
            return {
                ...state,
                searchByName: action.searchByName
            }
        }
        case ACTIONS_TYPE.RANGE_MIN_MAX_COUNT: {
            return {
                ...state,
                minCount: action.minCount,
                maxCount: action.maxCount
            }
        }
        default:
            return state
    }
}
type ActionsType = SearchACType | MinMaxCountType

export type SearchACType = {
    type: ACTIONS_TYPE.SEARCH_BY_NAME,
    searchByName: string
}
export type MinMaxCountType = {
    type: ACTIONS_TYPE.RANGE_MIN_MAX_COUNT,
    minCount: number,
    maxCount: number
}

export const searchAC = (searchByName: string) =>
    ({type: ACTIONS_TYPE.SEARCH_BY_NAME, searchByName} as const)

export const MinMaxCount = (minCount: number, maxCount: number) =>
    ({type: ACTIONS_TYPE.RANGE_MIN_MAX_COUNT, minCount, maxCount} as const)





