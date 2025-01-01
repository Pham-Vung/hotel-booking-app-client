import React, { useState } from 'react';
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

const DateSlider = ({ onDateChange, onFilterChange }) => {
    const [dateRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
        key: "selection"
    });

    const handleSelect = (ranges) => {
        setDateRange(ranges.selection);
        onDateChange(ranges.selection.startDate, ranges.selection.endDate);
        onFilterChange(ranges.selection.startDate, ranges.selection.endDate);
    }

    const handleClearFilter = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key: "selection"
        });
        onDateChange(null, null);
        onFilterChange(null, null);
    }
    return (
        <>
            <h5>Tìm lịch đặt phòng theo ngày</h5>
            <div className='d-flex align-items-start gap-2'>
                <DateRangePicker ranges={[dateRange]} onChange={handleSelect} className='mb-4' />
                <button className='btn btn-secondary btn-sm' onClick={handleClearFilter}>Xóa tìm kiếm</button>
            </div>
        </>
    )
}

export default DateSlider;
