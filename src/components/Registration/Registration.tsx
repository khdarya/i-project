import React, {useCallback, useEffect, useState} from 'react'
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {registerUser} from "../../bll/registrationReducer";


type RegistrationType = {
    isError: string
}

const Registration: React.FC<RegistrationType> = (props) => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [error, setError] = useState<string | null>(null)

    const dispatch = useDispatch();

    useEffect(() => setError(props.isError), [props.isError])


    const onRegister = useCallback(function () {
        const thunk = registerUser(email, password)
        dispatch(thunk)
    }, [email, password, dispatch]);


    return (
        <div>
            Email address
            <SuperInputText placeholder={"Enter your email"} onChangeText={setEmail} value={email} />
            <br/>
            Password
            <SuperInputText placeholder={"Enter your password"} onChangeText={setPassword} value={password}/>
            <br/>
            Confirm Password
            <SuperInputText placeholder={"Confirm password"} onChangeText={setConfirmPassword} value={confirmPassword}/>
            <br/>
            <div>{error}</div>
            <br/>
            <SuperButton type={'submit'} onClick={onRegister}>Sign Up</SuperButton>
        </div>
    )
}

export default Registration