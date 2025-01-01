import React, { useState } from 'react';
import { bookRoom, getRoomById } from '../utils/ApiFunctions';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import BookingSummary from './BookingSummary';

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren: "",
    });

    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    });

    const { roomId } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    }

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId);
            setRoomPrice(response.roomPrice);
        } catch (error) {
            throw new Error(error);
        }
    }

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffInDays = checkOutDate.diff(checkInDate, "days");
        const price = roomPrice ? roomPrice : 0;
        return diffInDays * price;
    }

    const isGuestValid = () => {
        const adultCount = parseInt(booking.numberOfAdults);
        const childrenCount = parseInt(booking.numberOfChildren);
        const totalCount = adultCount + childrenCount;
        return totalCount >= 1 && adultCount >= 1;
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Ngày trả phòng phải bằng hoặc nằm sau ngày nhận phòng");
            return false;
        } else {
            setErrorMessage("");
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.checkValidity() || !isGuestValid() || !isCheckOutDateValid()) {
            e.stopPropagation();
        } else {
            setIsSubmitted(true);
        }
        setIsValidated(true);
    }

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking);// trả về confirmation code
            setIsSubmitted(true);
            navigate("/booking-success", { state: { message: confirmationCode } });
        } catch (error) {
            setErrorMessage(error.message);
            navigate("/booking-success", { state: { error: errorMessage } });
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId);
    }, [roomId]);

    return (
        <>
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='card card-body mt-5'>
                            <h4 className='card-title'>Đặt phòng</h4>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor='guestFullName'>Tên đầy đủ:</Form.Label>
                                    <FormControl
                                        required
                                        type='text'
                                        id='guestFullName'
                                        name='guestFullName'
                                        value={booking.guestFullName}
                                        placeholder='Nhập tên đầy đủ'
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập tên đầy đủ
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor='guestEmail'>Email:</Form.Label>
                                    <FormControl
                                        required
                                        type='email'
                                        id='guestEmail'
                                        name='guestEmail'
                                        value={booking.guestEmail}
                                        placeholder='Nhập địa chỉ email'
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập địa chỉ email
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <fieldset style={{ border: '2px' }}>
                                    <legend>Thời gian thuê</legend>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <Form.Label htmlFor='checkInDate'>Ngày nhận phòng:</Form.Label>
                                            <FormControl
                                                required
                                                type='date'
                                                id='checkInDate'
                                                name='checkInDate'
                                                value={booking.checkInDate}
                                                placeholder='Ngày nhận phòng'
                                                min={moment().format("MMM Do, YYYY")}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Vui lòng lựa chọn ngày nhận phòng
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className='col-6'>
                                            <Form.Label htmlFor='checkOutDate'>Ngày trả phòng:</Form.Label>
                                            <FormControl
                                                required
                                                type='date'
                                                id='checkOutDate'
                                                name='checkOutDate'
                                                value={booking.checkOutDate}
                                                placeholder='Ngày trả phòng'
                                                min={moment().format("MMM Do, YYYY")}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Vui lòng lựa chọn ngày trả phòng
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                                    </div>
                                </fieldset>

                                <fieldset style={{border: '2px'}}>
                                    <legend>Số lượng khách</legend>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <Form.Label htmlFor='numberOfAdults'>Người lớn:</Form.Label>
                                            <FormControl
                                                required
                                                type='number'
                                                id='numberOfAdults'
                                                name='numberOfAdults'
                                                value={booking.numberOfAdults}
                                                placeholder='0'
                                                min={1}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Vui lòng lựa chọn ít nhất có 1 người lớn
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className='col-6'>
                                            <Form.Label htmlFor='numberOfChildren'>Trẻ em:</Form.Label>
                                            <FormControl
                                                required
                                                type='number'
                                                id='numberOfChildren'
                                                name='numberOfChildren'
                                                value={booking.numberOfChildren}
                                                placeholder='0'
                                                min={0}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Lựa chọn 0 nếu không có trẻ em
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className='form-group my-2'>
                                    <button type='submit' className='btn btn-hotel'>Tiếp tục</button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                isFormValid={isValidated}
                                onConfirm={handleBooking}
                            />
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default BookingForm;
