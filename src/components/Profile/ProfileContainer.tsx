import React from 'react'
import Profile from "./Profile";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";


const ProfileContainer = React.memo(() => {
        const name = useSelector<AppStoreType, string>((state) => state.profile.profile.name)
        const publicCardPacksCount = useSelector<AppStoreType, number>((state) => state.profile.profile.publicCardPacksCount)
        const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)

        if (!isLoggedIn) {
            return <Redirect to={PATH.LOGIN}/>
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