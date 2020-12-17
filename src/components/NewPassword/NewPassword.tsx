import React, {useCallback, useEffect, useState} from 'react'
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {changeNewInputPass, sendNewPass} from "../../bll/newPasswordReducer";
import {Redirect, useParams} from 'react-router-dom';
import styles from '../common/styles/FormStyle.module.css'
import {checkLength, checkMatch, checkRequired} from "../../utils/validators";
import {AppStoreType} from "../../bll/store";
import {PATH} from "../Routes";

const NewPassword: React.FC = () => {
    console.log('NewPassword')

    const newPass = useSelector((state: AppStoreType) => state.newPassword.password)
    const serverError = useSelector((state: AppStoreType) => state.request.responseError)
    const isRequestInProgress = useSelector((state: AppStoreType) => state.request.isRequestInProgress)
    const isRequestSuccess = useSelector((state: AppStoreType) => state.request.isRequestSuccess)
    const [newPassConfirm, setNewPassConfirm] = useState<string>('')
    const [passwordsError, setPasswordsError] = useState<string | null>(null)
    const [serverErrorText, setServerErrorText] = useState<string | null>(null)
    const {id}: any = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        if (serverError.inComponent === 'NewPassword') {
            setServerErrorText(serverError.text)
        } else {
            setServerErrorText(null)
        }
    }, [serverError])

    const handlerChangeNewPassText = useCallback((text: string) => {
        dispatch(changeNewInputPass(text))
        setPasswordsError(null)
        setServerErrorText(null)
    }, [newPass])

    const handlerChangeNewConfirmPassText = useCallback((text: string) => {
        setNewPassConfirm(text)
        setPasswordsError(null)
        setServerErrorText(null)
    }, [newPassConfirm])

    const handlerOnClickSendPass = useCallback(() => {
        !checkRequired(newPass) && setPasswordsError('Required')
        !checkLength(newPass, 7) && setPasswordsError('Too short. Need more then 7 symbols')
        !checkLength(newPassConfirm, 7) && setPasswordsError('Too short. Need more then 7 symbols')
        !checkRequired(newPassConfirm) && setPasswordsError('Required')
        !checkMatch(newPass, newPassConfirm) && setPasswordsError(`Don't match`)

        checkRequired(newPass)
        && checkRequired(newPassConfirm)
        && checkLength(newPass, 7)
        && checkLength(newPassConfirm, 7)
        && checkMatch(newPass, newPassConfirm)
        && dispatch(sendNewPass(id))
    }, [newPass, newPassConfirm, serverError])

    if (isRequestSuccess) {
        return <Redirect to={PATH.Login}/>
    }

    return (
        <div className={styles.body}>
            <div className={styles.form}>
                <div>New password</div>
                <div className={styles.sendingWrapper}>
                    {isRequestInProgress && <div>Sending please wait...</div>}
                </div>
                <div className={styles.formInput}>
                    <SuperInputText placeholder={'Enter your password'}
                                    onChangeText={handlerChangeNewPassText}
                                    error={(!!passwordsError ? passwordsError : '')}
                                    className={!!serverErrorText ? 'error' : ''}/>
                </div>
                <div className={styles.formInput}>
                    <SuperInputText placeholder={'Confirm password'}
                                    onChangeText={handlerChangeNewConfirmPassText}
                                    error={!!passwordsError ? passwordsError : ''}
                                    className={!!serverErrorText ? 'error' : ''}/>
                </div>
                <div className={styles.serverErrorWrapper}>
                    {serverErrorText && <div className={styles.error}>{serverErrorText}</div>}
                </div>
                <div>
                    <SuperButton onClick={handlerOnClickSendPass}
                                 red={(passwordsError || serverErrorText) != null}
                                 disabled={isRequestInProgress}>Change My Password</SuperButton>
                </div>
            </div>
        </div>
    )
}

export default NewPassword