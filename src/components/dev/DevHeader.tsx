import React, {useCallback} from "react"
import {NavLink} from "react-router-dom"
import styles from './DevHeader.module.css'
import {useDispatch, useSelector} from "react-redux";
import {logoutTC} from "../../bll/loginReducer";
import SuperButton from "../common/SuperButton/SuperButton";
import {AppStoreType} from "../../bll/store";

type DevHeaderType = {
    titles: Object
}
export const DevHeader: React.FC<DevHeaderType> = React.memo(({titles}) => {
        const requestInProgress = useSelector<AppStoreType, boolean>(state => state.request.isRequestInProgress)

        const dispatch = useDispatch()
        const logOutHandler = useCallback(() => {
            dispatch(logoutTC())
        }, [dispatch])
        return (
            <div className={styles.wrapper}>
                {Object.keys(titles).map(key => {
                    //@ts-ignore
                    return <NavLink key={key} to={titles[key]} activeClassName={styles.active}
                                    className={styles.navLink}>{key}</NavLink>
                })}
                <SuperButton className={styles.logout} disabled={requestInProgress} onClick={logOutHandler}>Logout</SuperButton>
            </div>
        )
    }
)
