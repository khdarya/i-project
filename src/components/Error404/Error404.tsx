import React from 'react'
import {NavLink} from "react-router-dom";
import styles from './Error404.module.css'

const Error404 = () => {
    return (
        <div className={styles.body}>
            <div className={styles.mainbox}>
                <div className={styles.err}>404</div>
                <div className={styles.msg}>
                    Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
                    <p>Let's go <NavLink className={styles.errLink} to={'/login'}>login page</NavLink> and try from there.</p>
                </div>
            </div>
        </div>
    )
}

export default Error404