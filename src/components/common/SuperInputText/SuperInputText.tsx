import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import s from './SuperInputText.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
};

const SuperInputText: React.FC<SuperInputTextPropsType> = React.memo((
    {
        type,
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        className, spanClassName,
        ...restProps
    }
) => {
    console.log('SuperInputText')

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)
        e.key === "Enter" && onEnter && onEnter()
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`
    const finalInputClassName = `${s.superInput} ${className === "error" || error ? s.errorInput : s.blue }`

    return (
        <>
            <input
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps}
            />
            {error && <div className={finalSpanClassName}>{error}</div>}
        </>
    )
})

export default SuperInputText
