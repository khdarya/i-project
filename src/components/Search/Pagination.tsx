import React, {useEffect, useState} from "react";
import styles from './Search.module.css'
import {useDispatch} from "react-redux";

type PaginationType = {
    itemsCountInTotal: number
    itemsOnOnePage: number
    currentPage: number
    shownAmount?: number

}


const Pagination = (props: PaginationType) => {

    const {itemsCountInTotal, itemsOnOnePage, shownAmount = 5} = props;
    const [value, setValue] = useState("")

    // const dispatch = useDispatch();

    let pagesAmount = Math.ceil(itemsCountInTotal / itemsOnOnePage);
    let pages = [];
    for (let i = 1; i <= pagesAmount; i++) {
        pages.push(i)
    }

    // const pagesAmount = [];
    // for (let i = 1; i <= Math.ceil(itemsCountInTotal / itemsOnOnePage); i++){
    //     pagesAmount.push(i)
    // }

    // useEffect(() => {
    //     dispatch(getPacksTC(setValue, currentPage, itemsOnOnePage))
    // }, [currentPage])
    //


    let shownCount = Math.ceil(pagesAmount / shownAmount)

    let [shownPages, setShownPages] = useState(1);


    return (
        <div>
            {pages.map((page: number, index: number) => <span key={index} className={styles.page}>{page}</span>)}

            {(shownPages > 1)
                ?
                <div>
                    <button onClick={() => setShownPages(1)}>start</button>
                    <button onClick={() => setShownPages(shownPages - 1)}>previous</button>
                </div>
                : ''
            }

            {/*{(shownCount > shownPages)*/}
            {/*    ?*/}
            {/*    <div>*/}
            {/*        <button onClick={() => setShownPages(shownPages + 1)}>next</button>*/}
            {/*        <button onClick={() => setShownPages(shownCount)}>end</button>*/}
            {/*    </div>*/}
            {/*    :''*/}
            {/*}*/}
            <button onClick={() => setShownPages(shownPages + 1)}>next</button>
        </div>
    )
}

export default Pagination;