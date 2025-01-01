import { parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DateSlider from '../common/DateSlider';

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

    const toISOString = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo;

        if (startDate && endDate) {
            filtered = bookingInfo.filter(booking => {
                const bookingStartDate = parseISO(toISOString(booking.checkInDate));
                const bookingEndDate = parseISO(toISOString(booking.checkOutDate));
                return (bookingStartDate >= startDate
                    && bookingEndDate <= endDate
                    && bookingEndDate > startDate
                );
            });
        }
        setFilteredBookings(filtered);
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo);
        // console.log(filteredBookings);
    }, [bookingInfo]);

    return (
        <section className='p-4'>
            <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
            <table className="table table-bordered table-hover shadow">
                <thead className='text-center align-middle'>
                    <tr>
                        <th>STT</th>
                        <th>Mã đặt phòng</th>
                        <th>Mã phòng</th>
                        <th>Kiểu phòng</th>
                        <th>Ngày nhận phòng</th>
                        <th>Ngày trả phòng</th>
                        <th>Tên khách hàng</th>
                        <th>Email</th>
                        <th>Người lớn</th>
                        <th>Trẻ em</th>
                        <th>Tổng khách hàng</th>
                        <th>Mã xác nhận</th>
                        <th colSpan={2}>Khác</th>
                    </tr>
                </thead>
                <tbody className='text-center align-middle'>
                    {filteredBookings.map((booking, index) => (
                        <tr key={booking.bookingId}>
                            <td>{index + 1}</td>
                            <td>{booking.bookingId}</td>
                            <td>{booking.room.id}</td>
                            <td>{booking.room.roomType}</td>
                            <td>{toISOString(booking.checkInDate)}</td>
                            <td>{toISOString(booking.checkOutDate)}</td>
                            <td>{booking.guestName}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numberOfAdults}</td>
                            <td>{booking.numberOfChildren}</td>
                            <td>{booking.totalNumberOfGuests}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => handleBookingCancellation(booking.bookingId)}
                                >
                                    Hủy
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filterBookings.length === 0 && <p>Không tìm thấy đặt phòng nào vào những ngày đã chọn</p>}
        </section>
    )
}

export default BookingsTable;
