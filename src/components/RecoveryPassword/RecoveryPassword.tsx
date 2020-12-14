import React, {useCallback, useEffect, useState} from 'react'
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import styles from './RecoveryPassword.module.css'
import {changeInputEmail, forgotPass} from '../../bll/recoveryPasswordReducer';
import {checkEmail, checkLength, checkRequired} from "../../utils/validators";

type RecoveryPasswordType = {
    email: string
    responseError: string | null
    isRequestInProgress: boolean
    isRequestSuccess: boolean
}
const RecoveryPassword: React.FC<RecoveryPasswordType> = React.memo((
    {
        email,
        responseError,
        isRequestInProgress,
        isRequestSuccess
    }
    ) => {
        console.log('RecoveryPassword')

        const dispatch = useDispatch()
        const [localErrorText, setLocalErrorText] = useState<string | null>(null)
        useEffect(() => setLocalErrorText(responseError), [responseError])

        const handlerChangeEmailText = useCallback((text: string) => {
            dispatch(changeInputEmail(text))
            setLocalErrorText(null)
        }, [responseError, email])

        const handlerClickSend = useCallback(() => {
            !checkEmail(email) &&  setLocalErrorText('Not email')
            !checkLength(email, 5) && setLocalErrorText('Too short')
            !checkRequired(email) &&  setLocalErrorText('Required')

            checkEmail(email)
            && checkLength(email, 5)
            && checkRequired(email)
            && dispatch(forgotPass())

        }, [email])

        return (
            <div>
                {isRequestSuccess
                    ? <div>The message is sent successfully. Please check your email: <b>{email}</b></div>
                    : <div>
                        <div className={styles.sendingWrapper}>
                            {isRequestInProgress && <div>Sending please wait...</div>}
                        </div>
                        <div className={styles.inputWrapper}>
                            <SuperInputText
                                onChangeText={handlerChangeEmailText}
                                placeholder={'Enter your email...'}
                                error={!!localErrorText ? localErrorText : ''}/>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <SuperButton
                                onClick={handlerClickSend}
                                disabled={isRequestInProgress}>Send</SuperButton>
                        </div>
                    </div>
                }
            </div>
        )
    }
)

export default RecoveryPassword