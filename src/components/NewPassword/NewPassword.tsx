import React, {useCallback, useEffect, useState} from 'react'
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {changeNewInputPass, sendNewPass} from "../../bll/newPasswordReducer";
import {useParams} from 'react-router-dom';
import styles from './NewPassword.module.css'
import {checkMatch, checkRequired} from "../../utils/validators";

type NewPasswordType = {
    newPass: string
    responseError: string | null
    isRequestInProgress: boolean
}
const NewPassword: React.FC<NewPasswordType> = React.memo((
    {
        newPass,
        responseError,
        isRequestInProgress,
    }
    ) => {
        console.log('NewPassword')

        const dispatch = useDispatch()
        const [newPassConfirm, setNewPassConfirm] = useState<string>('')
        const [localErrorText, setLocalErrorText] = useState<string | null>(null)

        useEffect(() => setLocalErrorText(responseError), [responseError])

        const {id}: any = useParams();

        const handlerChangeNewPassText = useCallback((text: string) => {
            dispatch(changeNewInputPass(text))
            setLocalErrorText(null)
        }, [newPass])

        const handlerChangeNewConfirmPassText = useCallback((text: string) => {
            setNewPassConfirm(text)
            setLocalErrorText(null)
        }, [newPassConfirm])


        const handlerOnClickSendPass = useCallback(() => {
            !checkRequired(newPass) && setLocalErrorText('Required')
            !checkRequired(newPassConfirm) && setLocalErrorText('Required')
            !checkMatch(newPass, newPassConfirm) && setLocalErrorText(`Don't match`)

            checkRequired(newPass)
            && checkRequired(newPassConfirm)
            && checkMatch(newPass, newPassConfirm)
            && dispatch(sendNewPass(id))

        }, [newPass, newPassConfirm, responseError])


        return (
            <>
                <div>
                    <div className={styles.sendingWrapper}>
                        {isRequestInProgress && <div>Sending please wait...</div>}
                    </div>
                    <div className={styles.inputWrapper}>
                        <SuperInputText placeholder={'Enter your new password'}
                                        onChangeText={handlerChangeNewPassText}
                                        error={(!!localErrorText ? localErrorText : '')}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <SuperInputText placeholder={'Confirm your new password'}
                                        onChangeText={handlerChangeNewConfirmPassText}
                                        error={!!localErrorText ? localErrorText : ''}
                        />
                    </div>
                    <div>
                        <SuperButton onClick={handlerOnClickSendPass}
                                     red={!!localErrorText}
                                     disabled={isRequestInProgress}>Change My Password</SuperButton>
                    </div>
                </div>
            </>
        )
    }
)

export default NewPassword