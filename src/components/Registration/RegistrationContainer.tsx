import React, {useCallback, useState} from 'react';
import Registration from "./Registration";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../bll/registrationReducer";
import {AppStoreType} from "../../bll/store";
import { Redirect } from 'react-router-dom';

export const RegistrationContainer = React.memo(() => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const dispatch = useDispatch();

    let isRegistration = useSelector<AppStoreType>(state => state.registration.isRegistered)

    const onRegister = useCallback(function() {
        const thunk = registerUser(email, password, confirmPassword)
        dispatch(thunk)
    }, [email, password, confirmPassword, dispatch]);


    if(isRegistration) {
        return <Redirect to={'/login'} />
    }


    return (
        <Registration setConfirmPassword={setConfirmPassword} setPassword={setPassword} setEmail={setEmail}
                      onButtonSubmit={onRegister}
                      email={email} password={password} confirmPassword={confirmPassword}/>
    )
});