import React, { useState } from 'react';
import { cancelBooking, getBookingByComfirmationCode } from '../utils/ApiFunctions';

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [bookingInfo, setBookingInfo] = useState({
        bookingConfirmationCode: "",
        bookingId: "",
        room: { id: "", roomType: "" },
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numberOfAdults: "",
        numberOfChildren: "",
        totalNumberOfGuests: ""
    });

    const clearBookingInfo = {
        bookingConfirmationCode: "",
        bookingId: "",
        room: { id: "", roomType: "" },
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numberOfAdults: "",
        numberOfChildren: "",
        totalNumberOfGuests: ""
    }

    const toISOString = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await getBookingByComfirmationCode(confirmationCode);
            setBookingInfo(data);
            setIsLoading(false);
            setError("");
        } catch (error) {
            setBookingInfo(clearBookingInfo);
            if (error.message) {
                setError(error.message);
            } else {
                setError(error.response);
            }
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId);
            setIsDeleted(true);
            setSuccessMessage("Đã hủy lịch đặt phòng");
            setBookingInfo(clearBookingInfo);
            setConfirmationCode("");
            setError("");
        } catch (error) {
            setError(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setIsDeleted(false);
        }, 2000);
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2 className='text-center mb-4'>Tìm kiếm lịch đặt phòng của bạn</h2>
                <form onSubmit={handleFormSubmit} className='col-md-6'>
                    <div className='input-group mb-3'>
                        <input
                            type="text"
                            className='form-control'
                            id='confirmationCode'
                            name='confirmationCode'
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder='Nhập mã xác nhận'
                        />
                        <button className='btn btn-hotel input-group-text btn-sm'>Tìm kiếm</button>
                    </div>
                </form>
                {isLoading ? (
                    <div>Đang tìm kiếm lịch đặt phòng...</div>
                ) : error ? (
                    <div className='text-danger'>{error}</div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div className='col-md-6 mt-4 mb-5'>
                        <h3>Thông tin đặt phòng</h3>
                        <p className='text-success'>Mã xác nhận: {bookingInfo.bookingConfirmationCode}</p>
                        <p>Mã phòng: {bookingInfo.room.id}</p>
                        <p>Kiểu phòng : {bookingInfo.room.roomType}</p>
                        <p>
                            Ngày nhận phòng: {""}
                            {toISOString(bookingInfo.checkInDate)}
                        </p>
                        <p>
                            Ngày trả phòng: {""}
                            {toISOString(bookingInfo.checkOutDate)}
                        </p>
                        <p>Tên đầy đủ: {bookingInfo.guestName}</p>
                        <p>Email: {bookingInfo.guestEmail}</p>
                        <p>Người lớn: {bookingInfo.numberOfAdults}</p>
                        <p>Trẻ em: {bookingInfo.numberOfChildren}</p>
                        <p>Tổng khách: {bookingInfo.totalNumberOfGuests}</p>

                        {!isDeleted && (
                            <button
                                className='btn btn-danger btn-sm'
                                onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
                            >
                                Hủy đặt phòng
                            </button>
                        )}
                    </div>
                ) : (
                    <div>Tìm kiếm đặt phòng...</div>
                )}

                {isDeleted && (
                    <div className='alert alert-success mt-3 fade-show'>{successMessage}</div>
                )}
            </div>
        </>
    )
}

export default FindBooking;
