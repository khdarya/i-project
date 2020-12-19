import React from 'react'
import SuperButton from "../common/SuperButton/SuperButton";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../common/SuperInputText/SuperInputText";
import styles from '../common/styles/FormStyle.module.css'
import style from './Login.module.css'
import {NavLink} from "react-router-dom";

const Login: React.FC<LoginPropsType> = React.memo((
    {
        signInHandler, emailHandler, passwordHandler, checkboxHandler,
        requestInProgress, emailError, passwordsError, serverErrorText,
        email, password, rememberMe
    }
    ) => {
        return (
            <div className={styles.body}>
                <div className={styles.form}>
                    <div>Login</div>
                    <div className={styles.sendingWrapper}>
                        {requestInProgress && <div>Sending please wait...</div>}
                    </div>
                    <div className={styles.formInput}>
                        <SuperInputText type={"text"}
                                        placeholder={'Enter your email...'}
                                        onChangeText={emailHandler}
                                        value={email}
                                        error={!!emailError ? emailError : ''}
                        />
                    </div>
                    <div className={`${styles.formInput} ${style.password}`}>
                        <SuperInputText type={"password"}
                                        placeholder={'Enter your password'}
                                        onChangeText={passwordHandler}
                                        value={password}
                                        error={!!passwordsError ? passwordsError : ''}
                        />
                    </div>
                    <div>
                        <SuperCheckbox checked={rememberMe} onChangeChecked={checkboxHandler}>Remember Me</SuperCheckbox>
                    </div>
                    <div className={styles.serverErrorWrapper}>
                        {serverErrorText && <div className={styles.error}>{serverErrorText}</div>}
                    </div>
                    <div>
                        <SuperButton disabled={requestInProgress}
                                     onClick={signInHandler}
                                     red={(passwordsError || emailError || serverErrorText) != null}
                        >Sign In
                        </SuperButton>
                    </div>
                </div>
                <div>
                    <NavLink className={style.text} to={'/recpass'}>forgot password?</NavLink>
                </div>
                <div>
                    <NavLink className={style.text} to={'/registration'}>Registration</NavLink>
                </div>

            </div>
        )
    }
)

export default Login

type LoginPropsType = {
    signInHandler: () => void
    emailHandler: (enteredEmail: string) => void
    passwordHandler: (enteredPassword: string) => void
    checkboxHandler: (value: boolean) => void
    requestInProgress: boolean
    email: string
    password: string
    rememberMe: boolean
    emailError: string | null
    passwordsError: string | null
    serverErrorText: string | null
}