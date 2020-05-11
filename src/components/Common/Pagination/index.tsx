import React from 'react';
import Pagination from "react-js-pagination";
import { DEFAULT_LIST_DISPLAY_COUNT } from '../../../config/list_display_count'

import "./pagination.module.scss"

interface PaginationProps {
    activePage: number,
    totalCount:number,
    handlePageChange,
    displayCount?: number,
}


const AppPagination: React.FC<PaginationProps> = ({ activePage, totalCount, handlePageChange, displayCount }) => {

    return (
        <Pagination
            activePage={activePage}
            itemsCountPerPage={displayCount ? displayCount : DEFAULT_LIST_DISPLAY_COUNT}
            totalItemsCount={totalCount}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
        />
    );
}


export default AppPagination
