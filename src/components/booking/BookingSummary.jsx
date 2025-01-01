import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numberOfDays = checkOutDate.diff(checkInDate, "days");
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsProcessingPayment(false);
            setIsBookingConfirmed(true);
            onConfirm();
        }, 3000);
    }

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success");
        }
    }, [isBookingConfirmed, navigate]);
    return (
        <div className="row">
            <div className="col-md-6"></div>
            <div className='card card-body mt-5'>
                <h4 className='card-title hotel-color'>Tổng hợp thông tin đặt phòng</h4>
                <p>Tên: <strong>{booking.guestFullName}</strong></p>
                <p>Email: <strong>{booking.guestEmail}</strong></p>
                <p>Ngày nhận phòng: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></p>
                <p>Ngày trả phòng: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></p>
                <p>Tổng ngày đặt: <strong>{numberOfDays}</strong></p>
                <div>
                    <h5 className='hotel-color'>Số lượng khách</h5>
                    <strong>Người lớn: {booking.numberOfAdults}</strong> <br />
                    <strong>Trẻ em: {booking.numberOfChildren}</strong>
                </div>
                {payment > 0 ? (
                    <>
                        <p>Tổng số tiền thanh toán: <strong>{payment}VNĐ</strong></p>

                        {isFormValid && !isBookingConfirmed ? (
                            <Button variant='success' onClick={handleConfirmBooking}>
                                {isProcessingPayment ? (
                                    <>
                                        <span
                                            className='spinner-border spinner-border-sm me-2'
                                            role='status'
                                            aria-hidden="true"></span>
                                        Đã xác nhận đặt phòng, chuyển hướng đến thanh toán...
                                    </>
                                ) : (
                                    "Xác nhận đặt phòng và tiến hành thanh toán"
                                )}
                            </Button>
                        ) : isBookingConfirmed ? (
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className='spinner-border text-primary' role='status'>
                                    <span className='sr-only'>Đang tải...</span>
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <p className='text-danger'>Ngày trả phòng phải sau ngày nhận phòng</p>
                )}
            </div>
        </div>
    )
}

export default BookingSummary;
