import React from 'react';
import {NavLink} from 'react-router-dom';
import SuperButton from "../SuperButton/SuperButton";

type TablePropsType = {
    header: Object
    data: any
    onClickUpdBtn?: (id: string) => void
    onClickDelBtn?: (id: string) => void
    onClickLink?: (id: string) => void
    isLink?: boolean
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
        isActions,
        disabledBtn,
        onClickLink
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
                        && <><SuperButton disabled={disabledBtn} onClick={() => onClickUpdCallback(item.id)}>Update</SuperButton>
                             <SuperButton disabled={disabledBtn} onClick={() => onClickDelCallback(item.id)}>Delete</SuperButton>
                           </>}
                        {isLink
                        && <NavLink onClick={() => onClickLinkCallback(item.id)} to={'/cards'}>Cards</NavLink>}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
