import {PackType} from '../bll/packsReducer'
import {instance} from "./instance";

export type ResponseGetPacksType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number | null
    maxCardsCount: number | null
    minCardsCount: number | null
    page: number | null
    pageCount: number | null
    sortPacks: string
}

export const packsApi = {
    getPacks(params: any) {
        return instance.get<ResponseGetPacksType>(`/cards/pack`
            + (params.userId != null ? `/?user_id=${params.userId}&` : '/?')
            + (params.packName != null ? `packName=${params.packName}&` : '')
            + (params.min != null ? `min=${params.min}&` : '')
            + (params.max != null ? `max=${params.max}&` : '')
            + (params.sortPacks != null ? `sortPacks=${params.sortPacks}&` : '')
            + (params.page != null ? `page=${params.page}&` : '')
            + (params.pageCount != null ? `pageCount=${params.pageCount}&` : '')
        )
            .then(res => res.data)
    },
    addPack(newPack: any) {
        return instance.post(`/cards/pack`, {cardsPack: newPack})
            .then(res => res.data)
    },
    updPack(updPack: any) {
        return instance.put(`/cards/pack`, {cardsPack: updPack})
            .then(res => res.data)
    },
    delPack(packId: string) {
        return instance.delete(`/cards/pack/?id=${packId}`)
            .then(res => res.data)
    }
}