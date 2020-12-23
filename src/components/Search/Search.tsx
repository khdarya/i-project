import React, {ChangeEvent, useState} from 'react'
import SuperButton from "../common/SuperButton/SuperButton";
import SuperInputText from "../common/SuperInputText/SuperInputText";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import CardsCountRange from "./CardsCountRange";
import {searchAC, sortAC} from "../../bll/searchReducer";
import Sort from "./Sort";
import Pagination from "./Pagination";


const Search = () => {

    const dispatch = useDispatch()

    const onSearch = () => {
        //  dispatch(getPacksTC())
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchAC(e.currentTarget.value))
    }

    return (
        <div>
            <div>
                <div>
                    <SuperInputText onChange={onChange} placeholder={'Search cards pack name...'}/>
                    <SuperButton onClick={onSearch}><FontAwesomeIcon icon={faSearch}/></SuperButton>
                </div>

                <div>
                    <CardsCountRange name={'Cards Count Range'}/>
                </div>

                <div>
                    <SuperButton onClick={onSearch}>Search</SuperButton>
                </div>
            </div>

            <Sort/>
            <Pagination itemsCountInTotal={20} itemsOnOnePage={4} currentPage={1} />

        </div>
    )
}

export default Search;