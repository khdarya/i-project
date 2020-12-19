import React, {useCallback, useEffect, useState} from 'react'
import Login from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {loginTC} from "../../bll/loginReducer";
import {Redirect} from "react-router-dom";
import {fetchProfileTC} from "../../bll/profileReducer";
import {PATH} from "../Routes";
import {checkEmail, checkLength, checkRequired} from "../../utils/validators";

const LoginContainer = React.memo(() => {
        const dispatch = useDispatch()
        const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
        const requestInProgress = useSelector<AppStoreType, boolean>(state => state.request.isRequestInProgress)
        const serverError = useSelector((state: AppStoreType) => state.request.responseError)
        const [email, setEmail] = useState<string>('')
        const [password, setPassword] = useState<string>('')
        const [rememberMe, setRememberMe] = useState<boolean>(false)
        const [serverErrorText, setServerErrorText] = useState<string | null>(null)
        const [emailError, setEmailError] = useState<string | null>(null)
        const [passwordsError, setPasswordsError] = useState<string | null>(null)

        useEffect(() => {
            dispatch(fetchProfileTC())
            if (serverError.inComponent === 'LoginContainer') setServerErrorText(serverError.text)
            else setServerErrorText(null)
        }, [serverError, dispatch])

        const handlerOnClickSendPass = useCallback(() => {
            !checkEmail(email) && setEmailError('Not email')
            !checkLength(email, 5) && setEmailError('Too short')
            !checkLength(password, 5) && setPasswordsError('Too short')
            !checkRequired(email) && setEmailError('Required')
            !checkRequired(password) && setPasswordsError('Required')

            checkRequired(email)
            && checkEmail(email)
            && checkLength(email, 5)
            && checkRequired(password)
            && dispatch(loginTC(email, password, rememberMe))
        }, [email, password, rememberMe, serverError]);

        if (isLoggedIn) {
            return <Redirect to={PATH.Profile}/>
        }

        return (
            <>
                <Login signInHandler={handlerOnClickSendPass}
                       emailHandler={setEmail}
                       passwordHandler={setPassword}
                       checkboxHandler={setRememberMe}
                       requestInProgress={requestInProgress}
                       email={email}
                       password={password}
                       rememberMe={rememberMe}
                       emailError={emailError}
                       passwordsError={passwordsError}
                       serverErrorText={serverErrorText}
                />
            </>
        )
    }
)

export default LoginContainer