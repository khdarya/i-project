import React, {useState} from 'react';
import {MessageModals} from "./MessageModals";
import SuperButton from "../common/SuperButton/SuperButton";


export const ErrorMessageContainer: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <SuperButton onClick={() => setOpen(true)}>message Error</SuperButton>

            <MessageModals title={"Error"} close={() => setOpen(false)} open={open} setClose={() => setOpen(false)}>

            </MessageModals>
        </div>
    )

}

