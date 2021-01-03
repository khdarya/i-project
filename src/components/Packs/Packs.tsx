import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from "react"
import SuperButton from "../common/SuperButton/SuperButton";
import {Table} from "../common/Table/Table";
import CardsCountRange from "../Search/CardsCountRange";
import SuperInputText from "../common/SuperInputText/SuperInputText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import '../common/Pagination/Pagination.css'
import Pagination from "../common/Pagination/Pagination";
import {Modals} from "../Modals/Modals";
import {InputModals} from "../Modals/InputModals";
import {setNewPackName} from "../../bll/packsReducer";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type PacksPropsType = DefaultInputPropsType & {
    packsTableData: any
    isRequestInProgress: boolean
    onGetMyPacks: () => void
    onGetAllPacks: () => void
    onAddPack: (value: string) => void
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

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const AddItemHandler = () => setOpen(true)

    return (
        <div>
            <CardsCountRange/>

            <SuperButton onClick={onGetMyPacks} disabled={isRequestInProgress}>Get My Packs</SuperButton>
            <SuperButton onClick={onGetAllPacks} disabled={isRequestInProgress}>Get All Packs</SuperButton>
            <SuperButton onClick={AddItemHandler} disabled={isRequestInProgress}>Add Pack</SuperButton>

            <div>
                <SuperInputText onChange={onChangeCallback} placeholder={'Search cards pack name...'}/>
                <SuperButton onClick={onSearch}><FontAwesomeIcon icon={faSearch}/></SuperButton>
            </div>

            {
                <InputModals close={() => { onAddPack(value); setOpen(false); setValue(''); }}
                             open={open}
                             setClose={() => { setOpen(false)}}
                             setValue={setValue}
                             value={value}
                             />
            }

            <Table
                header={packsTableData[0]}
                data={packsTableData}
                onClickUpdBtn={onUpdPack}
                onClickDelBtn={onDelPack}
                disabledBtn={isRequestInProgress}
                onClickLink={onClickLink}
                isActions
                isLink
                isLearn/>

            <Pagination totalCount={totalCount}
                        pageSize={pageSize}
                        onPageClick={onPageClick}/>
        </div>

    )
}