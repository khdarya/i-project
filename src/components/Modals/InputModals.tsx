import React, {ReactNode, useState} from "react";
import {Modals} from "./Modals";
import SuperButton from "../common/SuperButton/SuperButton";
import SuperInputText from "../common/SuperInputText/SuperInputText";

interface IModalInput {
    open: boolean
    setClose: (e: boolean) => void;
    buttonTrue?: ReactNode;
    close: () => void
    answer?: string;
    setAnswer?: (answer: string) => void;
    value1?: string;
    setValue1?: (answer: string) => void;
    inputData?: any;
}

export const InputModals: React.FC<IModalInput> = ({
                                                       answer,
                                                       setAnswer = (answer: string) => {
                                                       },
                                                       value1,
                                                       setValue1 = (value1: string) => {
                                                       },
                                                       setClose = () => {
                                                       },
                                                       open,
                                                       buttonTrue = 'OK',
                                                       close
                                                   }) => {
    const [answerData, setAnswerData] = useState(answer);
    const [value, setValue] = useState(value1)

    const onSuccess = () => {
        setAnswer(answerData || '');
        setValue1(value || '')
        close();
    }

    return (
        <div>

            <Modals setClose={setClose}
                    show={open}
                    title={"Input Modal"}
            >
                <SuperInputText value={answerData}
                                onChange={e => setAnswerData(e.currentTarget.value)}></SuperInputText>
                <br/>
                <SuperInputText value={value} onChange={e => setValue(e.currentTarget.value)}></SuperInputText>

                <SuperButton onClick={onSuccess}>{buttonTrue}</SuperButton>
            </Modals>
        </div>
    )
}