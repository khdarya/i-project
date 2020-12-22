import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Error404 from './Error404/Error404'
import Test from './Test/Test'
import {DevHeader} from "./dev/DevHeader";
import { RegistrationContainer } from './Registration/RegistrationContainer'
import RecoveryPassword from './RecoveryPassword/RecoveryPassword'
import NewPassword from './NewPassword/NewPassword'
import LoginContainer from "./Login/LoginContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import Search from "./Search/Search";


export const PATH = {
    Login: '/login',
    Registration: '/registration',
    Profile: '/profile',
    Error404: '/404',
    Test: '/test',
    NewPassword: '/newpass/:id',
    RecoveryPassword: '/recpass',
    Search: '/search'
}

function Routes() {
    return (
        <div>
            <DevHeader titles={PATH}/>
            <Switch>
                <Route exact path={"/"} render={() => <Redirect to={PATH.Test}/>}/>
                <Route path={PATH.Login} render={() => <LoginContainer/>}/>
                <Route path={PATH.Registration} render={() => <RegistrationContainer/>}/>
                <Route path={PATH.NewPassword} render={() => <NewPassword/>}/>
                <Route path={PATH.RecoveryPassword} render={() => <RecoveryPassword/>}/>
                <Route path={PATH.Profile} render={() => <ProfileContainer/>}/>
                <Route path={PATH.Search} render={() => <Search />} />
                <Route path={PATH.Test} render={() => <Test/>}/>
                <Route render={() => <Error404/>}/>
            </Switch>
        </div>
    )
}

export default Routes
