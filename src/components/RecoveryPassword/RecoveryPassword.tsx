import React, {useCallback, useEffect, useState} from 'react'
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import styles from '../common/styles/FormStyle.module.css'
import {changeInputEmail, forgotPass} from '../../bll/recoveryPasswordReducer';
import {checkEmail, checkLength, checkRequired} from "../../utils/validators";
import {AppStoreType} from "../../bll/store";

const RecoveryPassword: React.FC = () => {
    console.log('RecoveryPassword')

    const email = useSelector((state: AppStoreType) => state.recoveryPassword.email)
    const responseError = useSelector((state: AppStoreType) => state.request.responseError)
    const isRequestInProgress = useSelector((state: AppStoreType) => state.request.isRequestInProgress)
    const isRequestSuccess = useSelector((state: AppStoreType) => state.request.isRequestSuccess)
    const [localErrorText, setLocalErrorText] = useState<string | null>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (responseError.inComponent === 'RecoveryPassword') {
            setLocalErrorText(responseError.text)
        } else {
            setLocalErrorText(null)
        }
    }, [responseError])

    const handlerChangeEmailText = useCallback((text: string) => {
        dispatch(changeInputEmail(text))
        setLocalErrorText(null)
    }, [responseError, email])

    const handlerClickSend = useCallback(() => {
        !checkEmail(email) && setLocalErrorText('Not email')
        !checkLength(email, 5) && setLocalErrorText('Too short')
        !checkRequired(email) && setLocalErrorText('Required')

        checkEmail(email)
        && checkLength(email, 5)
        && checkRequired(email)
        && dispatch(forgotPass())
    }, [email])

    return (
        <div className={styles.body}>
            {isRequestSuccess
                ? <div>The message is sent successfully. Please check your email: <b>{email}</b></div>
                : <div className={styles.form}>
                    <div>Recovery password</div>
                    <div className={styles.sendingWrapper}>
                        {isRequestInProgress && <div>Sending please wait...</div>}
                    </div>
                    <div className={styles.formInput}>
                        <SuperInputText
                            onChangeText={handlerChangeEmailText}
                            placeholder={'Enter your email'}
                            error={!!localErrorText ? localErrorText : ''}/>
                    </div>
                        <SuperButton
                            red={!!localErrorText}
                            onClick={handlerClickSend}
                            disabled={isRequestInProgress}>Send</SuperButton>
                </div>
            }
        </div>
    )
}

export default RecoveryPassword