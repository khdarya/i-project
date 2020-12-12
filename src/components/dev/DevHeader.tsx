import React from "react"
import {NavLink} from "react-router-dom"
import styles from './DevHeader.module.css'

type DevHeaderType = {
    titles: Object
}
export const DevHeader: React.FC<DevHeaderType> = ({titles}) => {
    return (
        <div className={styles.wrapper}>
            {Object.keys(titles).map(key => {
                //@ts-ignore
                return <NavLink key={key} to={titles[key]} activeClassName={styles.active} className={styles.item}>{key}</NavLink>
            })}
        </div>
    )
}

