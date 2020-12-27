import React, {useEffect} from 'react'
import './App.css'
import Routes, {PATH} from './components/Routes'
import {DevHeader} from "./components/dev/DevHeader";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./bll/store";
import {initializeApp} from "./bll/appReducer";
import {Preloader} from "./components/common/Preloader/Preloader";

function App() {
    const dispatch = useDispatch()
    const initialized = useSelector<AppStoreType, boolean>(state => state.app.initialized)
    useEffect(() => {
        if (!initialized) {
            dispatch(initializeApp())
        }
    }, [initialized, dispatch])
    if (!initialized) {
        return <Preloader/>
    }
    return (
        <>
            <DevHeader titles={PATH}/>
            <Routes/>
        </>
    )
}

export default App
