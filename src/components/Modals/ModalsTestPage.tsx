import React from 'react';
import {ModalsContainer} from "./ModalsContainer";
import {QuestionModalsContainer} from "./QuestionModalsContainer";
import {InputModalsContainer} from "./InputModalsContainer";
import {MessageModalsContainer} from "./MessageModalsContainer";
import {SuccessMessageContainer} from "./SuccessMessageContainer";
import {ErrorMessageContainer} from "./ErrorMessageContainer";


const ModalsTestPage: React.FC = () => {

    return (
        <div>
            <ModalsContainer />
            <QuestionModalsContainer />
            <InputModalsContainer />
            <MessageModalsContainer />
            <SuccessMessageContainer />
            <ErrorMessageContainer />

        </div>
    )
}

export default ModalsTestPage;