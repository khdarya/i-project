import React, {useCallback} from 'react';
import {NavLink} from 'react-router-dom';
import SuperButton from "../SuperButton/SuperButton";
import {Grade} from "../Grade/Grade";
import {PATH} from "../../Routes";

type TablePropsType = {
    header: Object
    data: any
    onClickUpdBtn?: (id: string) => void
    onClickDelBtn?: (id: string) => void
    onClickLink?: (id: string) => void
    onClickUpdGrade?: (id: string, grade: number) => void
    isLink?: boolean
    isLearn?: boolean
    isActions?: boolean
    disabledBtn?: boolean
}

export const Table: React.FC<TablePropsType> = (
    {
        header,
        data,
        onClickUpdBtn,
        onClickDelBtn,
        isLink,
        isLearn,
        isActions,
        disabledBtn,
        onClickLink,
        onClickUpdGrade
    }
) => {

    const onClickUpdCallback = (id: string) => {
        onClickUpdBtn && onClickUpdBtn(id)
    }

    const onClickDelCallback = (id: string) => {
        onClickDelBtn && onClickDelBtn(id)
    }

    const onClickLinkCallback = (id: string) => {
        onClickLink && onClickLink(id)
    }
    const onClickUpdGradeCallback = (id: string, grade: number) => {
        onClickUpdGrade && onClickUpdGrade(id, grade)
    }

    if (!header || !data) {
        return <div>No Data</div>
    }

    return (
        <table className="table">
            <thead>
            <tr>
                {Object.keys(header).map(key => <th>{key.toUpperCase()}</th>)}
                {isActions && <th>ACTIONS</th>}
            </tr>
            </thead>
            <tbody>

            {data.map((item: any) => (
                <tr key={item._id}>
                    {Object.values(item).map((value: any) => <td>{value}</td>)}
                    <td>
                        {isActions
                        && <><SuperButton disabled={disabledBtn}
                                          onClick={() => onClickUpdCallback(item.id)}>Update</SuperButton>
                            <SuperButton disabled={disabledBtn}
                                         onClick={() => onClickDelCallback(item.id)}>Delete</SuperButton>
                        </>}
                        {isLink && <NavLink onClick={() => onClickLinkCallback(item.id)} to={PATH.CARDS}>Cards</NavLink>}
                        {!isLink && <Grade isRequestInProgress={disabledBtn} value={item.grade}
                                           onClick={(value) => onClickUpdGradeCallback(item.id, value)}/>}
                        {isLearn && <NavLink onClick={() => onClickLinkCallback(item.id)} to={PATH.LEARN}>Learn</NavLink>}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
