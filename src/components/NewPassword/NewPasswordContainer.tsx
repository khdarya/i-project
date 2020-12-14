import React from 'react'
import NewPassword from "./NewPassword";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {PATH} from "../Routes";
import {Redirect} from "react-router-dom";

const NewPasswordContainer = () => {
    console.log('NewPasswordContainer')

    const newPass = useSelector((state: AppStoreType) => state.newPassword.password)
    const responseError = useSelector((state: AppStoreType) => state.request.responseError)
    const isRequestInProgress = useSelector((state: AppStoreType) => state.request.isRequestInProgress)
    const isRequestSuccess = useSelector((state: AppStoreType) => state.request.isRequestSuccess)

    return <>
        {isRequestSuccess
            ? <Redirect to={PATH.Login}/>
            : <NewPassword newPass={newPass}
                            responseError={responseError.inComponent === 'NewPassword' ? responseError.text : null}
                            isRequestInProgress={isRequestInProgress}/>
        }
        </>
}

export default NewPasswordContainer