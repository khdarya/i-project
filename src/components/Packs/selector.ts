import {AppStoreType} from "../../bll/store";

export const getPacksTableData = (state: AppStoreType) => {
    const cardPacks = state.packs.cardPacks
    return cardPacks.map((pack) => ({
        id: pack._id,
        name: pack.name,
        cardsCount: pack.cardsCount,
        updated: pack.updated,
        userName: pack.user_name,
        userId: pack.user_id
    }))
}