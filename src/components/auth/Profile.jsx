import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteUser, getBookingsByUserId, getUser } from '../utils/ApiFunctions';
import { invalid } from 'moment/moment';

const Profile = () => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        roles: [{
            id: "",
            name: ""
        }]
    });

    const [bookings, setBookings] = useState([
        {
            bookingId: "",
            room: { id: "", roomType: "" },
            checkInDate: "",
            checkOutDate: "",
            bookingConfirmationCode: ""
        }
    ]);

    const toISOString = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const fetchUser = async () => {
        try {
            const userData = await getUser(userId);
            setUser(userData);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchBookings = async () => {
        try {
            const response = await getBookingsByUserId(userId);
            setBookings(response);
            console.log(response);
        } catch (error) {
            console.error("Lỗi lấy ra các lịch đặt phòng: " + error.message);
            setErrorMessage(error.message);
        }
    }

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("Bạn muốn chắc chắn xóa tài khoản của mình không");
        if (confirmed) {
            await deleteUser(userId)
                .then(response => {
                    setMessage(response.data);
                    localStorage.removeItem("userId");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userRole");
                    navigate("/");
                    window.location.reload();
                })
                .catch(error => {
                    setErrorMessage(error.data);
                })
        }
    }

    useEffect(() => {
        fetchUser();
        fetchBookings();
    }, [userId]);


    return (
        <div className='container'>
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
            {message && <p className='text-danger'>{message}</p>}
            {user ? (
                <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
                    <h4 className='card-title text-center'>Thông tin người dùng</h4>
                    <div className="card-body">
                        <div className="col-md-10 mx-auto">
                            <div className="card mb-3 shadow">
                                <div className="row g-0">
                                    <div className="col-md-2">
                                        <div className="d-flex justify-content-center mb-4 p-4">
                                            <img
                                                src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                                                alt="Thông tin"
                                                className='rounded-circle'
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-10">
                                        <div className="card-body p-4">
                                            <div className="form-group row">
                                                <div className="col-md-2 col-form-label fw-bold">ID:</div>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.id}</p>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">Họ:</label>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.firstName}</p>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">Tên:</label>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.lastName}</p>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">Email:</label>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.email}</p>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">Quyền:</label>
                                                <div className="col-md-10">
                                                    <ul className="list-unstyled">
                                                        {user.roles.map(role => (
                                                            <li key={role.id} className='card-text'>
                                                                {role.name.split("_")[1]}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4 className="card-title text-center">Lịch sử đặt phòng</h4>
                            {bookings.length > 0 ? (
                                <table className='table table-bordered table-hover shadow'>
                                    <thead>
                                        <tr className='text-center align-middle'>
                                            <th scope='col'>Mã đặt phòng</th>
                                            <th scope='col'>Mã phòng</th>
                                            <th scope='col'>Kiểu phòng</th>
                                            <th scope='col'>Ngày nhận phòng</th>
                                            <th scope='col'>Ngày trả phòng</th>
                                            <th scope='col'>Mã xác nhận</th>
                                            <th scope='col'>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center align-middle'>
                                        {bookings.map((booking, index) => (
                                            <tr key={index}>
                                                <td>{booking.bookingId}</td>
                                                <td>{booking.room.id}</td>
                                                <td>{booking.room.roomType}</td>
                                                <td>
                                                    {/* {moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")} */}
                                                    {/* {toISOString(booking.checkInDate)} */}
                                                    {booking.checkInDate ? toISOString(booking.checkInDate) : invalid}
                                                </td>
                                                <td>
                                                    {/* {moment(booking.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")} */}
                                                    {/* {toISOString(booking.checkOutDate)} */}
                                                    {booking.checkOutDate ? toISOString(booking.checkOutDate) : invalid}
                                                </td>
                                                <td>{booking.bookingConfirmationCode}</td>
                                                <td className='text-success'>Đang diễn ra</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>Bạn chưa đặt phòng nào!</p>
                            )}

                            <div className="d-flex justify-content-center">
                                <div className="mx-2">
                                    <button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
                                        Xóa tài khoản
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Đang tải dữ liệu người dùng</p>
            )}
        </div>
    )
}

export default Profile
