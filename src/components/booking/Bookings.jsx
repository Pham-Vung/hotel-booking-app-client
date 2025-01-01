import React, { useState, useEffect } from 'react';
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions';
import Header from '../common/Header';
import BookingsTable from './BookingsTable';

const Bookings = () => {
    const [bookingInfo, setBookingInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId);
            const data = await getAllBookings();
            setBookingInfo(data);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getAllBookings()
                .then(data => {
                    setBookingInfo(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setIsLoading(false);
                });
        }, 1000);
    }, []);
    
    return (
        <section style={{ backgroundColor: "whitesmoke" }}>
            <Header title={"Tất cả các lịch đặt phòng"} />
            {error && (
                <div className='text-danger'>{error}</div>
            )}
            {isLoading ? (
                <div>Đang tải các lịch đặt phòng...</div>
            ) : (
                <BookingsTable
                    bookingInfo={bookingInfo}
                    handleBookingCancellation={handleBookingCancellation}
                />
            )}
        </section>
    )
}

export default Bookings;
