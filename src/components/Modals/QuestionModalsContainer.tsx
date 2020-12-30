import React, {useState} from 'react';
import {QuestionModals} from "./QuestionModals";
import SuperButton from "../common/SuperButton/SuperButton";


export const QuestionModalsContainer: React.FC = () => {


    const [open, setOpen] = useState(false);
    const [answer, setAnswer] = useState(false);

    const setTrue = () => {
        setAnswer(true);
        setOpen(false);
    };
    const setFalse = () => {
        setAnswer(false);
        setOpen(false);

    };

    return (
        <div>
            <div>
                <SuperButton onClick={() => setOpen(true)}>question Modal</SuperButton>
            </div>

            <QuestionModals
                setClose={() => setOpen(false)}
                open={open}
                setTrue={setTrue}
                setFalse={setFalse}
            />

            <div>
                {answer ? <span>Yes</span> : <span>No</span>}
            </div>

        </div>
    )
}