import React, {useCallback, useEffect, useState} from 'react'
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {registerUser} from "../../bll/registrationReducer";
import {checkEmail, checkLength, checkMatch, checkRequired} from "../../utils/validators";
import styles from './../common/styles/FormStyle.module.css'
import {ResponseErrorType} from "../../bll/requestReduced";
import {NavLink} from 'react-router-dom'

type RegistrationType = {
    serverError: ResponseErrorType
    isRequestInProgress: boolean
}

const Registration: React.FC<RegistrationType> = React.memo((props) => {

    console.log('Registration');

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [passwordsError, setPasswordsError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)
    const [serverErrorText, setServerErrorText] = useState<string | null>(null)
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.serverError.inComponent === 'Registration') {
            setServerErrorText(props.serverError.text)
        } else {
            setServerErrorText(null)
        }
    }, [props.serverError])
    useEffect(() => {
        if (props.serverError.inComponent === 'Registration') {
            setServerErrorText(props.serverError.text)
        } else {
            setServerErrorText(null)
        }
    }, [props.serverError])

    const onRegister = useCallback(() => {
        !checkEmail(email) && setEmailError('Not email')
        !checkLength(email, 5) && setEmailError('Too short')
        !checkRequired(email) && setEmailError('Required')
        !checkRequired(password) && setPasswordsError('Required')
        !checkRequired(confirmPassword) && setPasswordsError('Required')
        !checkMatch(password, confirmPassword) && setPasswordsError(`Don't match`)

        checkRequired(email)
        && checkEmail(email)
        && checkLength(email, 5)
        && checkRequired(password)
        && checkRequired(confirmPassword)
        && checkMatch(password, confirmPassword)
        && dispatch(registerUser(email, password, confirmPassword))
    }, [email, password, confirmPassword, props.serverError]);

    const handlerChangeEmail = useCallback((text: string) => {
        setEmail(text)
        setEmailError(null)
        setServerErrorText(null)
    }, [email])

    const handlerChangePassword = useCallback((text: string) => {
        setPassword(text)
        setPasswordsError(null)
        setServerErrorText(null)
    }, [password])

    const handlerChangeConfirmPassword = useCallback((text: string) => {
        setConfirmPassword(text)
        setPasswordsError(null)
        setServerErrorText(null)
    }, [confirmPassword])

    return (
        <div className={styles.body}>
            <div className={styles.form}>
                <div>Registration</div>
                <div className={styles.sendingWrapper}>
                    {props.isRequestInProgress && <div>Sending please wait...</div>}
                </div>
                <div className={styles.formInput}>
                    <SuperInputText placeholder={"Enter your email"}
                                    onChangeText={handlerChangeEmail}
                                    value={email}
                                    error={!!emailError ? emailError : ''}/>
                </div>
                <div className={styles.formInput}>
                    <SuperInputText placeholder={"Enter your password"}
                                    onChangeText={handlerChangePassword}
                                    value={password}
                                    type={'password'}

                                    error={!!passwordsError ? passwordsError : ''}
                    />
                </div>
                <div className={styles.formInput}>
                    <SuperInputText placeholder={"Confirm password"}
                                    onChangeText={handlerChangeConfirmPassword}
                                    value={confirmPassword}
                                    type={'password'}
                                    error={!!passwordsError ? passwordsError : ''}
                    />
                </div>
                <div className={styles.serverErrorWrapper}>
                    {serverErrorText && <div className={styles.error}>{serverErrorText}</div>}
                </div>
                <SuperButton
                    red={(passwordsError || emailError || serverErrorText) != null}
                    onClick={onRegister}
                    disabled={props.isRequestInProgress}>Sign Up</SuperButton>
            </div>
            <div >
                <NavLink className={styles.text} to={'/login'}>Login page</NavLink>
            </div>
        </div>
    )
})

export default Registration