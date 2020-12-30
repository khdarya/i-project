import React, {useState} from 'react';
import SuperButton from "../common/SuperButton/SuperButton";
import {InputModals} from "./InputModals";

export const InputModalsContainer: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [answer, setAnswer] = useState('test');
    const [value1, setValue1] = useState('value');

    return (
        <div>
            <SuperButton onClick={() => setOpen(true)}>input Modal</SuperButton>

            <InputModals close={() => setOpen(false)}
                         open={open}
                         setClose={() => setOpen(false)}
                         answer={answer}
                         setAnswer={setAnswer}
                         value1={value1}
                         setValue1={setValue1}
            />

            <div>
                {answer}-{value1}
            </div>
        </div>
    )

}