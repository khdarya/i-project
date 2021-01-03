import React from 'react'
import SuperButton from '../common/SuperButton/SuperButton'
import SuperCheckbox from '../common/SuperCheckbox/SuperCheckbox'
import SuperInputText from '../common/SuperInputText/SuperInputText'
import {useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {Grade} from "../common/Grade/Grade";

const Test = () => {
    const state = useSelector<AppStoreType, Array<any>>(state => state.packs.cardPacks)
    console.log(state)
    return (
        <div>
            <SuperButton>Button</SuperButton>
            <SuperCheckbox>Checkbox</SuperCheckbox>
            <SuperInputText/>
        </div>
    )
}

export default Test