import {AppStoreType} from "../../bll/store";

export const getCardsTableData = (state: AppStoreType) => {
    const cards = state.cards.cards
    return cards.map((card) => ({
        id: card._id,
        question: card.question,
        answer: card.answer,
        grade: card.grade,
        updated: card.updated,
    }))
}