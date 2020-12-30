import React, {useEffect, useState} from 'react';
import {Modals} from "./Modals";

interface IMessageModals {
    open: boolean
    setClose: (e: boolean) => void;

    startTop?: number;
    endTop?: number;
    time?: number;
    speed?: number;
    close: () => void;
    title: string
}

export const MessageModals: React.FC<IMessageModals> = ({
                                                            startTop = -50,
                                                            endTop = 30,
                                                            time = 1000,
                                                            speed = 10,
    open,  setClose = () => {}, close, title
                                                        }) => {

    const [top, setTop] = useState(startTop);
    const [updateInnerEndTop, setUpdateInnerEndTop] = useState<{f: (endTop: number) => void} | null>(null);

    useEffect(() => {
        if (updateInnerEndTop) {
            updateInnerEndTop.f(endTop);
        }
    }, [endTop, updateInnerEndTop]);

    useEffect(() => {
        if (open) {
            let innerTop = startTop;
            let innerEndTop = endTop;
            const setInnerEndTop = (endTop: number) => innerEndTop = endTop;
            setUpdateInnerEndTop({f: setInnerEndTop});
            const timer = setInterval(() => {
                if (innerTop + speed > innerEndTop) {

                    setTimeout(() => {
                        clearInterval(timer);
                        const timer2 = setInterval(() => {
                            innerTop -= speed;
                            setTop(innerTop);

                            if (innerTop < startTop) {
                                setUpdateInnerEndTop(null);
                                clearInterval(timer2);
                                setTop(startTop);
                                close();
                            }
                        }, 30)
                    }, time);
                } else {
                    innerTop += speed;
                    setTop(innerTop);
                }
            }, 30)
        }
    }, [open]);

    if (!open) return null;

    return (
        <div>
            <Modals setClose={setClose} show={open} title={title} >


            </Modals>
        </div>
    )
}