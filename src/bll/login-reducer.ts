export type ActionType = {
    type: "LOGIN"

}
export type LoginType = {

}

const initState: LoginType = {

};

export const loginReducer = (state = initState, action: ActionType): LoginType => {
    switch (action.type) {
        case "LOGIN": {
            return {...state};
        }
        default: return state;
    }
};

export const loadingAC = (): ActionType => {
    return { type: "LOGIN"}
};