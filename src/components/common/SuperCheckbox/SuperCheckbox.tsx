import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperCheckbox.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = React.memo((
    {
        type,
        onChange,
        onChangeChecked,
        className,
        spanClassName,
        children,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    const finalInputClassName = `${s.checkbox} ${className ? className : ""}`
    console.log("Cf")
    return (
        <label>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps}
            />
            {children && <span className={s.spanClassName}>{children}</span>}
        </label>
    )
})

export default SuperCheckbox
