import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {searchReducer, sortAC} from "../../bll/searchReducer";
import SuperButton from "../common/SuperButton/SuperButton";


const Sort = () => {
    const [nameSort, setNameSort] = useState<any>(1)
    const [sort, setSort] = useState(-1)
    const dispatch = useDispatch()

    const onSort = (s: number) => {
        setSort(s)
        dispatch(sortAC(s + 'count'))
    }
// const sortUp = () => setNameSort(searchReducer())
// const sortDown = () => setNameSort(searchReducer())


    return (
        <div>

            {/*<SuperButton onClick={sortUp}></SuperButton>*/}
            {/*<SuperButton onClick={sortDown}></SuperButton>*/}


            <SuperButton onClick={() => onSort(1)}>L</SuperButton>
            <SuperButton onClick={() => onSort(0)}>H</SuperButton>
        </div>
    )
}

export default Sort;