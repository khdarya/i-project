 import Pagination from "./Pagination";
// import React, {useCallback} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {AppStoreType} from "../../bll/store";
// import {setCurrentPage, setPageSize} from "../../bll/packsReducer";
//
//
// const PaginationContainer = () => {
//     const dispatch = useDispatch();
//
//     const currentPage = useSelector<AppStoreType>(state => state.packs)
//     const pageSize = useSelector<AppStoreType>(state => state.packs)
//     const totalCount = useSelector<AppStoreType>(state => state.packs)
//
//     const onChange = useCallback((page: number, pageSize: number) => {
//         dispatch(setPageSize(page, pageSize))
//     }, [pageSize]);
//
//     const onPageChange = useCallback((page: number) => {
//         dispatch(setCurrentPage(page))
//     }, [currentPage])
//
//
//         return (
//         <Pagination itemsCountInTotal={totalCount} currentPage={currentPage} itemsOnOnePage={pageSize}
//                     onChange={onChange} onPageChange={onPageChange}/>
//     )
// }
// export default PaginationContainer;