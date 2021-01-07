import React, {useEffect, useState} from "react"
import SuperButton from "../common/SuperButton/SuperButton";
import {Table} from "../common/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {getCardsTableData} from "./selector";
import {addCardTC, delCardTC, getCardsTC, updateGradeTC, updCardTC} from "../../bll/cardsReducer";
import {InputModals} from "../Modals/InputModals";

export const Cards = () => {
    console.log('Cards')

    const dispatch = useDispatch()
    const cardsTableData = useSelector((state: AppStoreType) => getCardsTableData(state))
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const isRequestInProgress = useSelector((state: AppStoreType) => state.request.isRequestInProgress)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        dispatch(getCardsTC())
    }, [dispatch])

    const onAddCard = (value: string) => {
        dispatch(addCardTC(value))
    }
    const onUpdCard = (id: string) => {
        dispatch(updCardTC(id))
    }
    const onDelCard = (id: string) => {
        dispatch(delCardTC(id))
    }
    const onClickUpdGrade = (id: string, grade: number) => {
        dispatch(updateGradeTC(id, grade))
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    //
    const AddItemHandler = () => setOpen(true)

    return (
        <div>
            <SuperButton onClick={AddItemHandler} disabled={isRequestInProgress}>Add Card</SuperButton>

            <InputModals open={open}
                         setClose={() => {
                             setOpen(false)}}
                         close={() => {
                             onAddCard(value);
                             setOpen(false);
                             setValue('')}}
                         setValue={setValue}
                         value={value}
                         title={"Insert your Answer"}
            />

            <Table
                header={cardsTableData[0]}
                data={cardsTableData}
                onClickUpdBtn={onUpdCard}
                onClickDelBtn={onDelCard}
                disabledBtn={isRequestInProgress}
                isActions
                onClickUpdGrade={onClickUpdGrade}
            />
        </div>
    )

}