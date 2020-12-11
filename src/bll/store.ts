import { createStore, combineReducers } from 'redux'
import {profileReducer} from './profileReducer'
import {passwordReducer} from './passwordReducer'
import {loginReducer} from './loginReducer'
import {registrationReducer} from './registrationReducer'

const reducers = combineReducers({
    login: loginReducer,
    password: passwordReducer,
    profile: profileReducer,
    registration: registrationReducer,
})
const store = createStore(reducers)

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store
