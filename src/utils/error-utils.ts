import {Dispatch} from "redux";
import {setAppStatusAC, setErrorMessage} from "../bll/appReducer";

export const handleServerNetworkError = (error: ErrorType, dispatch: Dispatch) => {
    console.log(error.response.data.error);
    dispatch(setErrorMessage(error.response.data.error ? error.response.data.error : '!!!network error'))
    dispatch(setAppStatusAC(false))
}

type ErrorType = {response:
                   {data:
                     {error: string}}}