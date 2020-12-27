import React from "react";
import preloader from "../assets/images/preloader.svg";
import styles from '../styles/FormStyle.module.css'

export const Preloader = () => {
    return <div className={styles.body}>
        <img src={preloader} alt={'preloader'}/>
    </div>
}