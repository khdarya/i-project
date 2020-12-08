import {loginReducer} from "./login-reducer";
import {combineReducers, createStore} from "redux";
import {registerReducer} from "./register-reducer";
import {profileReducer} from "./profile-reducer";
import {passwordReducer} from "./password-reducer";


const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    password: passwordReducer

});

const store = createStore(reducers);

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev
