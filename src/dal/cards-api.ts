import {instance} from "./instance";

export const cardsApi = {
    getCards(params: any) {
        return instance.get(`/cards/card`
            + (params.cardsPack_id != null ? `/?cardsPack_id=${params.cardsPack_id}&` : '/?')
            + (params.cardAnswer != null ? `cardAnswer=${params.cardAnswer}&` : '')
            + (params.cardQuestion != null ? `cardQuestion=${params.cardQuestion}&` : '')
            + (params.min != null ? `min=${params.min}&` : '')
            + (params.max != null ? `max=${params.max}&` : '')
            + (params.sortCards != null ? `sortCards=${params.sortCards}&` : '')
            + (params.page != null ? `page=${params.page}&` : '')
            + (params.pageCount != null ? `pageCount=${params.pageCount}&` : '')
        )
            .then(res => res.data)
    },
    addCard(newCard: any) {
        return instance.post(`/cards/card`, {card: newCard})
            .then(res => res.data)
    },
    updCard(updCard: any) {
        return instance.put(`/cards/card`, {card: updCard})
            .then(res => res.data)
    },
    delCard(cardId: string) {
        return instance.delete(`/cards/card/?id=${cardId}`)
            .then(res => res.data)
    },
    updGrade(grade: number, card_id: string) {
        return instance.put(`/cards/grade`, {grade, card_id})
    }
}