import React from 'react'
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";

type RegistrationType = {
    email: string
    password: string
    confirmPassword: string
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    setConfirmPassword: (confirmPassword: string) => void
    onButtonSubmit: () => void

}

const Registration: React.FC<RegistrationType> = (
    {email, password, confirmPassword, setEmail, setPassword, setConfirmPassword, onButtonSubmit}
) => {


    return (
        <div>
            Email address
            <SuperInputText placeholder={"Enter your email"} onChangeText={setEmail} value={email}/>
            <br/>
            Password
            <SuperInputText placeholder={"Enter your password"} onChangeText={setPassword} value={password}/>
            <br/>
            Confirm Password
            <SuperInputText placeholder={"Confirm password"} onChangeText={setConfirmPassword} value={confirmPassword}/>
            <br/>
            <SuperButton type={'submit'} onClick={onButtonSubmit}>Sign Up</SuperButton>
        </div>
    )
}

export default Registration