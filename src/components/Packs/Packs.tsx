import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react"
import SuperButton from "../common/SuperButton/SuperButton";
import {Table} from "../common/Table/Table";
import CardsCountRange from "../Search/CardsCountRange";
import SuperInputText from "../common/SuperInputText/SuperInputText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import '../common/Pagination/Pagination.css'
import Pagination from "../common/Pagination/Pagination";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type PacksPropsType = DefaultInputPropsType & {
    packsTableData: any
    isRequestInProgress: boolean
    onGetMyPacks: () => void
    onGetAllPacks: () => void
    onAddPack: () => void
    onUpdPack: (id: string) => void
    onDelPack: (id: string) => void
    onClickLink: (id: string) => void
    onSearch: () => void
    onChangeSearch?: (text: string) => void
    totalCount: number | null
    pageSize: number
    onPageClick: (page: number) => void
}
export const Packs: React.FC<PacksPropsType> = (
    {
        packsTableData,
        isRequestInProgress,
        onGetMyPacks,
        onGetAllPacks,
        onAddPack,
        onUpdPack,
        onDelPack,
        onClickLink,
        onSearch,
        onChangeSearch,
        onChange,
        totalCount,
        pageSize,
        onPageClick
    }
) => {
    console.log('Packs')

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeSearch && onChangeSearch(e.currentTarget.value)
    }

    return (
        <div>
            <CardsCountRange/>

            <SuperButton onClick={onGetMyPacks} disabled={isRequestInProgress}>Get My Packs</SuperButton>
            <SuperButton onClick={onGetAllPacks} disabled={isRequestInProgress}>Get All Packs</SuperButton>
            <SuperButton onClick={onAddPack} disabled={isRequestInProgress}>Add Pack</SuperButton>

            <div>
                <SuperInputText onChange={onChangeCallback} placeholder={'Search cards pack name...'}/>
                <SuperButton onClick={onSearch}><FontAwesomeIcon icon={faSearch}/></SuperButton>
            </div>

            <Table
                header={packsTableData[0]}
                data={packsTableData}
                onClickUpdBtn={onUpdPack}
                onClickDelBtn={onDelPack}
                disabledBtn={isRequestInProgress}
                onClickLink={onClickLink}
                isActions
                isLink/>

            <Pagination totalCount={totalCount}
                        pageSize={pageSize}
                        onPageClick={onPageClick}/>
        </div>

    )
}