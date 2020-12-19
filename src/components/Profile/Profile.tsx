import React from 'react'
import styles from '../common/styles/FormStyle.module.css'
import style from './Profile.module.css'

const Profile = React.memo((props: ProfilePropsType) => {
    const finalClassName = `${styles.body} ${style.wrapper}`
        return (
            <div className={finalClassName}>
                <div>
                    Name: {props.name}
                </div>
                <div>
                    Public card packs count: {props.publicCardPacksCount}
                </div>
            </div>
        )
    }
)

type ProfilePropsType = {
    name: string
    publicCardPacksCount: number
}

export default Profile