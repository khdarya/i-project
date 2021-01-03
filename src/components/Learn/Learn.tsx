import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {getCardsTC, updateGradeAC, updateGradeTC} from "../../bll/cardsReducer";
import SuperButton from "../common/SuperButton/SuperButton";
import {CardType} from "../../bll/cardsReducer";

const grades = ['Не знал', 'Забыл', 'Долго думал', 'Перепутал', 'Знал'];
const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    //console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}
const myGetCard = (cards: Array<CardType>) => {
    //debugger
    let count = cards.length
    let sumGrade = 0;
    for(let i = 0; i < count; i++) sumGrade += cards[i].grade

    let arrPercent = []
    arrPercent[0] = 0
    let onePercent = 100 / sumGrade
    for(let i = 0; i < count; i++) {
        let per = onePercent * cards[i].grade
        arrPercent[i + 1] = arrPercent[i] + per
    }

    const random = Math.random() * 100
    console.log(random)

    let j = 0
    for(let i = 0; i < arrPercent.length; i++) {
        if(arrPercent[i] < random) {
            j = i
        }
    }

    return cards[j]
}

export const Learn = () => {
    console.log('Learn')

    const dispatch = useDispatch()
    const cards = useSelector((state: AppStoreType) => state.cards.cards)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [newGrade, setNewGrade] = useState<number | null>(null)
    const [card, setCard] = useState<CardType | null>(null)
    const [first, setFirst] = useState<boolean>(true);

    // console.log('rand 100', Math.random() * 100)
    // card && console.log('id', card._id)
    // card && console.log('grade', card.grade)

    useEffect(() => {
        if (first) {
            dispatch(getCardsTC())
            setFirst(false)
        }
        if (cards.length > 0) {
            setCard(getCard(cards))
        }
    }, [dispatch, cards, first])

    const onClickNext = () => {
        // upd visible Grade buttons and answer
        setIsChecked(false);

        // upd front-Grade redux
        card && newGrade && dispatch(updateGradeAC(newGrade, card.shots + 1, card._id));
        setNewGrade(null)

        // get the next new Card
        setCard(getCard(cards));

        console.log('MY grade: ', myGetCard(cards).grade)
        console.log('IGNAT grade: ', getCard(cards).grade)

        // upd back-Grade via thunk
        card && newGrade && dispatch(updateGradeTC(card._id, newGrade))
    }

    return (
        <div>
            <div>{card && card.question}</div>
            <SuperButton onClick={() => setIsChecked(true)}>Check</SuperButton>
            {isChecked
            && <div>
                <div>{card && card.answer}</div>
                {grades.map((g, i) => <SuperButton onClick={() => setNewGrade(i + 1)} key={i}>{g} - { i+1 }</SuperButton> )}
                <div>
                    <SuperButton onClick={onClickNext}>Next question</SuperButton>
                </div>
            </div>
            }
        </div>
    )
}