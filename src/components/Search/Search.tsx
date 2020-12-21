import React from 'react'
import SuperButton from "../common/SuperButton/SuperButton";
import SuperInputText from "../common/SuperInputText/SuperInputText";


const Search = () => {
    return (
        <div>
            <div>
                Search <SuperInputText  />
                Cards Count Range
                <SuperButton>Search</SuperButton>
            </div>
        </div>
    )
}

export default Search;