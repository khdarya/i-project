import React from 'react';
import Registration from "./Registration";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {Redirect} from 'react-router-dom';
import {PATH} from "../Routes";

export const RegistrationContainer = () => {
    console.log('RegistrationContainer')

    let isRegistration = useSelector<AppStoreType>(state => state.registration.isRegistered)
    let serverError = useSelector((state: AppStoreType) => state.request.responseError)
    let isRequestInProgress = useSelector((state: AppStoreType) => state.request.isRequestInProgress)

    if (isRegistration) {
        return <Redirect to={PATH.Login}/>
    }

    return (
        <Registration
            serverError={serverError}
            isRequestInProgress={isRequestInProgress}
        />
    )
};