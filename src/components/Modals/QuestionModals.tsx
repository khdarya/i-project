import React, {ReactNode} from "react";
import SuperButton from "../common/SuperButton/SuperButton";
import {Modals} from "./Modals";


interface IModalQuestion {
    open: boolean
    setTrue: () => void;
    setFalse: () => void
    buttonTrue?: ReactNode;
    buttonFalse?: ReactNode;
    setClose: (e: boolean) => void;

}

export const QuestionModals: React.FC<IModalQuestion> = ({
                                                             setClose = () => {},
                                                             setTrue,
                                                             setFalse,
                                                             open,
                                                             buttonTrue = 'Yes',
                                                             buttonFalse = 'No',
                                                         }) => {
    return (
        <div>


            <Modals
                setClose={setClose}
                show={open}
                title={"Question Modal"}
            >

                <SuperButton onClick={setTrue}>{buttonTrue}</SuperButton>
                <SuperButton onClick={setFalse}>{buttonFalse}</SuperButton>

            </Modals>

        </div>
    )
}