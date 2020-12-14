import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = React.memo((
    {
        red, className,
        ...restProps
    }
) => {
    console.log('SuperButton')

    const finalClassName = `${red ? s.red : s.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    );
})

export default SuperButton
