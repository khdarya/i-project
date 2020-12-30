import React, {useState} from 'react';
import {MessageModals} from "./MessageModals";
import SuperButton from "../common/SuperButton/SuperButton";


export const MessageModalsContainer: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <SuperButton onClick={() => setOpen(true)}>message Modal</SuperButton>

            <MessageModals title={"Message Modal"} close={() => setOpen(false)} open={open} setClose={() => setOpen(false)}>

            </MessageModals>
        </div>
    )

}