import React from "react";
import ReactPaginate from "react-paginate";
import '../Pagination/Pagination.css'

type PaginationType = {
    totalCount: number | null
    pageSize: number
    onPageClick: (page: number) => void
}

const Pagination: React.FC<PaginationType> = (
    {
        totalCount,
        pageSize,
        onPageClick
    }
) => {

    const calcPageCount = () => {
        let pageCount = 1;
        totalCount && (pageCount = Math.ceil(totalCount / pageSize))
        return pageCount
    }

    const handlePageClick = (e: { selected: number }) => {
        const selectedPage = e.selected + 1;
        onPageClick(selectedPage)
        console.log('click on page in Pagination')
    };

    return (
        <div className={'Pagination'}>
            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={calcPageCount()}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                // subContainerClassName={"pages pagination"}
            />
        </div>
    )
}

export default Pagination;