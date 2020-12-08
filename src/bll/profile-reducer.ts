export type ActionType = {
    type: "PROFILE"

}
export type ProfileType = {

}

const initState: ProfileType = {

};

export const profileReducer = (state = initState, action: ActionType): ProfileType => {
    switch (action.type) {
        case "PROFILE": {
            return {...state};
        }
        default: return state;
    }
};

export const profileAC = (): ActionType => {
    return { type: "PROFILE"}
};