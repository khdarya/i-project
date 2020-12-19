import React, {useEffect} from 'react'
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {fetchProfileTC} from "../../bll/profileReducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";


const ProfileContainer = React.memo(() => {
        const dispatch = useDispatch()
        const name = useSelector<AppStoreType, string>((state) => state.profile.profile.name)
        const publicCardPacksCount = useSelector<AppStoreType, number>((state) => state.profile.profile.publicCardPacksCount)
        const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)

        useEffect(() => {
            dispatch(fetchProfileTC())
        }, [dispatch])

        if (!isLoggedIn) {
            return <Redirect to={PATH.Login}/>
        }
        return (
            <div>
                <Profile name={name}
                         publicCardPacksCount={publicCardPacksCount}
                />
            </div>

        )
    }
)
export default ProfileContainer