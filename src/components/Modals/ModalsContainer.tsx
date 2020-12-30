import React, {useState} from 'react';
import {Modals} from "./Modals";
import SuperButton from "../common/SuperButton/SuperButton";

export const ModalsContainer: React.FC = () => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <SuperButton onClick={() => setOpen(true)}>simple Modal</SuperButton>

            <Modals  title={"Modal Container"} show={open} setClose={setOpen}  >
                <SuperButton onClick={() => setOpen(false)}>Close</SuperButton>
            </Modals>

        </div>
    )
}