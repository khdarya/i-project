import React from 'react'
import {useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import RecoveryPassword from "./RecoveryPassword";

const RecoveryPasswordContainer = () => {
    console.log('RecoveryPasswordContainer')

    const email = useSelector((state: AppStoreType) => state.recoveryPassword.email)
    const responseError = useSelector((state: AppStoreType) => state.request.responseError)
    const isRequestInProgress = useSelector((state: AppStoreType) => state.request.isRequestInProgress)
    const isRequestSuccess = useSelector((state: AppStoreType) => state.request.isRequestSuccess)

    return <RecoveryPassword
        email={email}
        responseError={responseError.inComponent === 'RecoveryPassword' ? responseError.text : null}
        isRequestInProgress={isRequestInProgress}
        isRequestSuccess={isRequestSuccess}
    />
}

export default RecoveryPasswordContainer