import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Error404 from './Error404/Error404'
import Test from './Test/Test'
import {RegistrationContainer} from './Registration/RegistrationContainer'
import RecoveryPassword from './RecoveryPassword/RecoveryPassword'
import NewPassword from './NewPassword/NewPassword'
import LoginContainer from "./Login/LoginContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import { PacksContainer } from './Packs/PacksContainer';
import {Cards} from './Cards/Cards';
import Search from "./Search/Search";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    ERROR404: '/404',
    TEST: '/test',
    NEW_PASSWORD: '/newpass/:id',
    RECOVERY_PASSWORD: '/recpass',
    PACKS: '/packs',
    CARDS: '/cards',
    SEARCH: '/search'
}

function Routes() {
    return (
        <div>
            <Switch>
                <Route exact path={"/"} render={() => <Redirect to={PATH.TEST}/>}/>
                <Route path={PATH.LOGIN} render={() => <LoginContainer/>}/>
                <Route path={PATH.REGISTRATION} render={() => <RegistrationContainer/>}/>
                <Route path={PATH.NEW_PASSWORD} render={() => <NewPassword/>}/>
                <Route path={PATH.RECOVERY_PASSWORD} render={() => <RecoveryPassword/>}/>
                <Route path={PATH.PROFILE} render={() => <ProfileContainer/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>
                <Route path={PATH.PACKS} render={() => <PacksContainer/>}/>
                <Route path={PATH.CARDS} render={() => <Cards/>}/>
                <Route path={PATH.SEARCH} render={() => <Search/>}/>
                <Route render={() => <Error404/>}/>
            </Switch>
        </div>
    )
}

export default Routes
