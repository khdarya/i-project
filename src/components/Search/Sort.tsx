import React, {useState} from "react";
import {useDispatch} from "react-redux";
import SuperButton from "../common/SuperButton/SuperButton";
import {getPacksTC, setSortAC} from "../../bll/packsReducer";


const Sort: React.FC = () => {

    const [sort, setSort] = useState(-1)
    const dispatch = useDispatch()

    const onSort = (s: number) => {
        setSort(s)
        dispatch(setSortAC(s + 'count'))
        dispatch(getPacksTC())
    }


    return (
        <div>

            <SuperButton onClick={() => onSort(1)}>L</SuperButton>
            <SuperButton onClick={() => onSort(0)}>H</SuperButton>
        </div>
    )
}

export default Sort;