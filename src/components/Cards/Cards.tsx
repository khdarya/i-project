import React, {useEffect} from "react"
import SuperButton from "../common/SuperButton/SuperButton";
import {Table} from "../common/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {getCardsTableData} from "./selector";
import {addCardTC, delCardTC, getCardsTC, updCardTC} from "../../bll/cardsReducer";

export const Cards = () => {
    console.log('Cards')

    const dispatch = useDispatch()
    const cardsTableData = useSelector((state: AppStoreType) => getCardsTableData(state))
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const isRequestInProgress = useSelector((state: AppStoreType) => state.request.isRequestInProgress)

    useEffect(() => {
        dispatch(getCardsTC())
    }, [dispatch])

    const onAddCard = () => {
        dispatch(addCardTC())
    }
    const onUpdCard = (id: string) => {
        dispatch(updCardTC(id))
    }
    const onDelCard = (id: string) => {
        dispatch(delCardTC(id))
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            <SuperButton onClick={onAddCard} disabled={isRequestInProgress}>Add Card</SuperButton>

            <Table
                header={cardsTableData[0]}
                data={cardsTableData}
                onClickUpdBtn={onUpdCard}
                onClickDelBtn={onDelCard}
                disabledBtn={isRequestInProgress}
                isActions
            />
        </div>
    )

}