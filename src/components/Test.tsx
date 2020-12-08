import React from "react";
import SuperInputText from "../common/SuperInputText/SuperInputText";
import s from "./Test.module.css";
import SuperButton from "../common/SuperButton/SuperButton";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";

function Test() {

    return (
        <div>
            <hr/>

            <div className={s.column}>

                <SuperInputText/>

                <SuperButton red>
                    button
                </SuperButton>


                <SuperCheckbox>
                    check
                </SuperCheckbox>

            </div>

        </div>
    );
}

export default Test;