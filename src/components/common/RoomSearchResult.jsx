import React, { useState } from 'react';

const RoomSearchResult = ({results, onClearSearch}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const resultPerPage  = 3;
    const totalResults = results.length();
    const totalPages = Math.ceil(totalResults / resultPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    return (
        <div>

        </div>
    )
}

export default RoomSearchResult;
