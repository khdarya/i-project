import React, {useCallback, useEffect, useState} from 'react'
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {registerUser} from "../../bll/registrationReducer";
import {checkEmail, checkLength, checkMatch, checkRequired} from "../../utils/validators";
import styles from './../common/styles/FormStyle.module.css'


type RegistrationType = {
    isError: string
    isRequestInProgress: boolean
}

const Registration: React.FC<RegistrationType> = React.memo((props) => {

    console.log('Registration');

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [localError, setLocalError] = useState<string | null>(null)
    const [localPassError, setLocalPassError] = useState<string | null>(null)

    const dispatch = useDispatch();

    useEffect(() => setLocalError(props.isError), [props.isError])
    useEffect(() => setLocalPassError(props.isError), [props.isError])


    const onRegister = useCallback(() => {

        !checkEmail(email) && setLocalError('Not email')
        !checkLength(email, 5) && setLocalError('Too short')
        !checkRequired(email) && setLocalError('Required')

        !checkRequired(password) && setLocalPassError('Required')
        !checkRequired(confirmPassword) && setLocalPassError('Required')

        !checkMatch(password, confirmPassword) && setLocalPassError(`Don't match`)


        checkEmail(email)
        && checkLength(email, 5)
        && checkRequired(email)

        && checkRequired(password)
        && checkRequired(confirmPassword)

        && checkMatch(password, confirmPassword)

        && dispatch(registerUser(email, password, confirmPassword))

    }, [email, password, confirmPassword, props.isError, dispatch]);


    return (
        <div className={styles.body}>
            <div className={styles.form}>

                <SuperInputText placeholder={"Enter your email"} onChangeText={setEmail} value={email}
                                error={!!localError ? localError : ''}/>
                                {/*error={!!localError && (!checkEmail(email) || !checkLength(email, 5) || !checkRequired(email))  ? localError : ''}/>*/}

                <SuperInputText placeholder={"Enter your password"} onChangeText={setPassword} value={password}
                                error={!!localPassError ? localPassError : ''} />
                                {/*error={!!localError && !checkRequired(password) ? localError : ''} />*/}

                <SuperInputText placeholder={"Confirm password"} onChangeText={setConfirmPassword}
                                value={confirmPassword}
                                error={!!localPassError ? localPassError : ''} />
                                {/*error={!!localError && !checkRequired(confirmPassword) ? localError : ''} />*/}

                <SuperButton className={styles.submitButton}
                             onClick={onRegister}
                             disabled={props.isRequestInProgress}>Sign Up</SuperButton>
            </div>
            <div className={styles.bottomLink}>
                <a href={'/login'}>Login page</a>
            </div>
        </div>
    )
})

export default Registration