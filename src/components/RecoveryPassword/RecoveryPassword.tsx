import React from 'react'
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";


type RecoveryPasswordtype = {
    changeInputPass: (text: string) => void
    forgotPass: () => void
}
const RecoveryPassword: React.FC<RecoveryPasswordtype> = (
    {
        changeInputPass,
        forgotPass,
    }
) => {
    const handlerChangeText = (text: string) => {
        changeInputPass(text)
    }

    const handlerClickSend = () => {
        forgotPass()
    }

    return (
        <div>
            <SuperInputText onChangeText={handlerChangeText} placeholder={'Enter your email...'}/>
            <SuperButton onClick={handlerClickSend}>Send</SuperButton>
        </div>
    )
}

export default RecoveryPassword