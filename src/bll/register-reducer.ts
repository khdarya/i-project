export type ActionType = {
    type: "REGISTER"

}
export type RegisterType = {

}

const initState: RegisterType = {

};

export const registerReducer = (state = initState, action: ActionType): RegisterType => {
    switch (action.type) {
        case "REGISTER": {
            return {...state};
        }
        default: return state;
    }
};

export const registerAC = (): ActionType => {
    return { type: "REGISTER"}
};