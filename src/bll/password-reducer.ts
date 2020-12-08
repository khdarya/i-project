export type ActionType = {
    type: "PASSWORD"

}
export type PasswordType = {

}

const initState: PasswordType = {

};

export const passwordReducer = (state = initState, action: ActionType): PasswordType => {
    switch (action.type) {
        case "PASSWORD": {
            return {...state};
        }
        default: return state;
    }
};

export const passwordAC = (): ActionType => {
    return { type: "PASSWORD"}
};