import React from 'react';
import Registration from "./Registration";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {Redirect} from 'react-router-dom';

export const RegistrationContainer = () => {


    let isRegistration = useSelector<AppStoreType>(state => state.registration.isRegistered)
    let isError = useSelector((state: AppStoreType) => state.registration.error)


    if (isRegistration) {
        return <Redirect to={'/login'}/>
    }


    return (
        <Registration
                      isError={isError}
        />
    )
};