import React, {ReactNode, useState} from "react";
import {Modals} from "./Modals";
import SuperButton from "../common/SuperButton/SuperButton";
import SuperInputText from "../common/SuperInputText/SuperInputText";

interface IModalInput {
    open: boolean
    setClose: (e: boolean) => void;
    buttonTrue?: ReactNode;
    close: () => void
    value?: string;
    setValue?: (value: string) => void;
    inputData?: any;
}

export const InputModals: React.FC<IModalInput> = ({
                                                       value,
                                                       setValue = (value: string) => {
                                                       },
                                                       setClose = () => {
                                                       },
                                                       open,
                                                       buttonTrue = 'OK',
                                                       close
                                                   }) => {
    const onSuccess = () => {
        setValue(value || '')
        close();
    }

    return (
        <div>

            <Modals setClose={setClose}
                    show={open}
                    title={"Input Modal"}
            >
                <SuperInputText value={value} onChange={e => setValue(e.currentTarget.value)}></SuperInputText>

                <SuperButton onClick={onSuccess}>{buttonTrue}</SuperButton>
            </Modals>
        </div>
    )
}