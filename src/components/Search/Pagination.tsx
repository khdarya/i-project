import React from "react";

type PaginationType = {
    pageTotalCount: number
    pageCount: number
}



const Pagination = (props: PaginationType) => {
    const {pageTotalCount, pageCount} = props;

    const pageCountArr = [];
    for (let i = 1; i <= Math.ceil(pageTotalCount / pageCount); i++){
        pageCountArr.push(i)
    }

    ///...

    return (
        <div>
            <select>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={20}>20</option>
            </select>
        </div>
    )
}

export default Pagination;