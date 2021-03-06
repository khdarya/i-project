import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import {profileReducer} from './profileReducer'
import {newPasswordReducer} from './newPasswordReducer'
import {loginReducer} from './loginReducer'
import {registrationReducer} from './registrationReducer'
import {recoveryPasswordReducer} from "./recoveryPasswordReducer";
import thunkMiddleware from 'redux-thunk'
import {requestReducer} from "./requestReducer";
import {appReducer} from "./appReducer";
import {packsReducer} from "./packsReducer";
import {cardsReducer} from "./cardsReducer";
import {searchReducer} from "./searchReducer";

const reducers = combineReducers({
    login: loginReducer,
    newPassword: newPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    profile: profileReducer,
    registration: registrationReducer,
    request: requestReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
    search: searchReducer
})
export type AppStoreType = ReturnType<typeof reducers>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store
