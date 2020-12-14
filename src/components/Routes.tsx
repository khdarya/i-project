import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './Login/Login'
import Profile from  './Profile/Profile'
import Error404 from './Error404/Error404'
import Test from './Test/Test'
import {DevHeader} from "./dev/DevHeader";
import RecoveryPasswordContainer from "./RecoveryPassword/RecoveryPasswordContainer";
import NewPasswordContainer from "./NewPassword/NewPasswordContainer";
import {RegistrationContainer} from "./Registration/RegistrationContainer";

export const PATH = {
    Login: '/login',
    Registration: '/registration',
    Profile: '/profile',
    Error404: '/404',
    Test: '/test',
    NewPassword: '/newpass/:id',
    RecoveryPassword: '/recpass',
}

function Routes() {
    return (
        <div>
            <DevHeader titles={PATH}/>
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to={PATH.Test}/>}/>
                <Route path={PATH.Login} render={() => <Login/>}/>
                <Route path={PATH.Registration} render={() => <RegistrationContainer />}/>
                <Route path={PATH.NewPassword} render={() => <NewPasswordContainer/>}/>
                <Route path={PATH.RecoveryPassword} render={() => <RecoveryPasswordContainer/>}/>
                <Route path={PATH.Profile} render={() => <Profile />}/>
                <Route path={PATH.Test} render={() => <Test/>}/>
                <Route render={() => <Error404/>}/>
            </Switch>
        </div>
    )
}

export default Routes
