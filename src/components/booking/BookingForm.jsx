import React, { useState } from 'react';
import { bookRoom, getRoomById } from '../utils/ApiFunctions';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const [booking, setBooking] = useState({
        guestName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
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
        const diffInDays = checkOutDate.diff(checkInDate);
        const price = roomPrice ? roomPrice : 0;
        return diffInDays * price;
    }

    const isGuestValid = () => {
        const adultCount = parseInt(booking.numOfAdults);
        const childrenCount = parseInt(booking.numOfChildren);
        const totalCount = adultCount + childrenCount;
        return totalCount >= 1 && adultCount >= 1;
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Ngày trả phòng phải bằng hoặc nằm sau ngày nhận phòng");
            return false;
        }
        setErrorMessage("");
        return true;
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
            navigate("/", { state: { message: confirmationCode } });
        } catch (error) {
            setErrorMessage(error.message);
            navigate("/", { state: { error: errorMessage } });
        }
    }
    useEffect(() => {
        getRoomPriceById(roomId);
    }, [roomId]);
    return (
        <div>

        </div>
    )
}

export default BookingForm;
