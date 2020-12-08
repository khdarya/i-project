import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import Login from "../components/Login";
import Error404 from "../components/Error404";
import Profile from "../components/Profile";
import ResetPassword from "../components/ResetPassword";
import NewPassword from "../components/NewPassword";
import Test from "../components/Test";
import Register from "../components/Register";


export const PATH = {
    LOGIN: "/login",
    REGISTER: "/register",
    PROFILE: '/profile',
    RESETPASSWORD: '/resetpassword',
    NEWPASSWORD: '/newpassword',
    TEST: '/test'

}

function Routes() {
    return (
        <div>

            <Switch>

                <Route path={"/"} exact render={() => <Redirect to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTER} render={() => <Register/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.RESETPASSWORD} render={() => <ResetPassword/>}/>
                <Route path={PATH.NEWPASSWORD} render={() => <NewPassword/>}/>

                <Route path={PATH.TEST} render={() => <Test/>}/>


                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    );
}

export default Routes;
