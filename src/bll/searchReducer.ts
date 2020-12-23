export enum ACTIONS_TYPE {
    SEARCH_BY_NAME = 'Search/SEARCH_BY_NAME',
    RANGE_MIN_MAX_COUNT = 'Search/RANGE_MIN_MAX_COUNT',
    SORT = 'Search/SORT',
}

export type SearchType = {
    minCount: number
    maxCount: number
    searchByName: string
    sortItem: string
}
const initState: SearchType = {
    minCount: 1,
    maxCount: 4,
    searchByName: '',
    sortItem: ''

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
        case ACTIONS_TYPE.SORT: {
            // let newState: Array<cardsPack> = []
            // if (action.sortItem === 'up') {
            //     newState = state.sort((a: cardsPack, b: cardsPack) => {
            //         if(nameA < nameB) {
            //             return -1
            //         }
            //         if(nameA > nameB) {
            //             return 1
            //         }
            //         return 0;
            //     })
            //     return state;
            // }
            // if(action.sortItem === 'down') {
            //     newState = state.sort((a: cardsPack, b: cardsPack): any => {
            //         if(nameB < nameA) {
            //             return -1
            //         }
            //         if(nameB > nameA) {
            //             return 1
            //         }
            //         return 0;
            //     })
            //     return state;
            // }

            return {
                ...state,
                sortItem: action.sortItem
            }
        }
        default:
            return state
    }
}
type ActionsType = SearchACType | MinMaxCountType | SortACType

export type SearchACType = {
    type: ACTIONS_TYPE.SEARCH_BY_NAME,
    searchByName: string
}
export type MinMaxCountType = {
    type: ACTIONS_TYPE.RANGE_MIN_MAX_COUNT,
    minCount: number,
    maxCount: number
}
export type SortACType = {
    type: ACTIONS_TYPE.SORT,
    sortItem: string
}

export const searchAC = (searchByName: string) =>
    ({type: ACTIONS_TYPE.SEARCH_BY_NAME, searchByName} as const)

export const minMaxCountAC = (minCount: number, maxCount: number) =>
    ({type: ACTIONS_TYPE.RANGE_MIN_MAX_COUNT, minCount, maxCount} as const)

export const sortAC = (sortItem: string) =>
    ({type: ACTIONS_TYPE.SORT, sortItem} as const)





