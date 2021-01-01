import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {addPackTC, delPackTC, getPacksTC, setCurrentPage, setMyID, updPackTC} from "../../bll/packsReducer";
import {AppStoreType} from "../../bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {getPacksTableData} from "./selector";
import {setCardPackId} from "../../bll/cardsReducer";
import {Packs} from "./Packs";
import {searchAC} from "../../bll/searchReducer";

export const PacksContainer = () => {
    console.log('PacksContainer')

    const dispatch = useDispatch()
    const packsTableData = useSelector((state: AppStoreType) => getPacksTableData(state))
    const myID = useSelector<AppStoreType, string>(state => state.profile.profile._id)
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const isRequestInProgress = useSelector<AppStoreType, boolean>(state => state.request.isRequestInProgress)
    const totalCount = useSelector<AppStoreType, number | null>(state => state.packs.totalCount)
    const pageSize = useSelector<AppStoreType, number>(state => state.packs.pageSize)


    useEffect(() => {
        dispatch(setMyID(null))
        dispatch(getPacksTC())
    }, [dispatch])

    const onGetMyPacks = () => {
        dispatch(setMyID(myID))
        dispatch(getPacksTC())
    }
    const onGetAllPacks =() => {
        dispatch(setMyID(null))
        dispatch(getPacksTC())
    }
    const onAddPack = (value: string) => {
        dispatch(addPackTC(value))
    }
    const onUpdPack = (id: string) => {
        dispatch(updPackTC(id))
    }
    const onDelPack = (id: string) => {
        dispatch(delPackTC(id))
    }
    const onClickLink = (packId: string) => {
        dispatch(setCardPackId(packId))
    }
    const onSearch = () => {
        dispatch(getPacksTC())
    }
    const onChangeSearch = (text: string) => {
        dispatch(searchAC(text))
    }

    const onPageClick = (page: number) => {
        dispatch(setCurrentPage(page))
        dispatch(getPacksTC())
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return <Packs packsTableData={packsTableData}
                  isRequestInProgress={isRequestInProgress}
                  onGetMyPacks={onGetMyPacks}
                  onGetAllPacks={onGetAllPacks}
                  onAddPack={onAddPack}
                  onUpdPack={onUpdPack}
                  onDelPack={onDelPack}
                  onClickLink={onClickLink}
                  onSearch={onSearch}
                  onChangeSearch={onChangeSearch}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  onPageClick={onPageClick}
    />

}