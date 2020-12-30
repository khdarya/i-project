import React from 'react';
import styles from './Modals.module.css'

type ModalsType = {

    title: string
    show: boolean
    setClose: (e: boolean) => void;
}


export const Modals: React.FC<ModalsType> = ({
                                                 show,
                                                 children,  title,
                                                 setClose = () => {}
                                             }) => {
    if (!show) return null

    return (
        <div>
            <div onClick={() => setClose(false)} className={styles.modal}/>

            <div className={styles.modalContainer} >
                <div className={styles.modalHeader}>
                    <div className={styles.modalTitle}>{title}</div>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
                <div className={styles.modalFooter}>

                </div>
            </div>
        </div>
    )
}

