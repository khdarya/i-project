import React, {useState} from 'react';
import SuperButton from "../common/SuperButton/SuperButton";
import {InputModals} from "./InputModals";

export const InputModalsContainer: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('value');

    return (
        <div>
            <SuperButton onClick={() => setOpen(true)}>input Modal</SuperButton>

            <InputModals close={() => setOpen(false)}
                         open={open}
                         setClose={() => setOpen(false)}
                         value={value}
                         setValue={setValue}
            />

            <div>
                {value}
            </div>
        </div>
    )

}