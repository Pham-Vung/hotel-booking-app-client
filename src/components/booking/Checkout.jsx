import React, { useEffect, useState } from 'react';
import BookingForm from './BookingForm';
import { getRoomById } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import {
    FaCar,
    FaParking,
    FaTshirt,
    FaTv,
    FaUtensils,
    FaWifi,
    FaWineGlassAlt
} from 'react-icons/fa';
import RoomCarousel from "../common/RoomCarousel";

const Checkout = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    });

    const { roomId } = useParams();
    useEffect(() => {
        setTimeout(() => {
            getRoomById(roomId)
                .then(response => {
                    setRoomInfo(response);
                    setIsLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setIsLoading(false);
                })
        }, 2000);
    }, [roomId]);

    return (
        <div>
            <section className='container'>
                <div className="row flex-column flex-md-row align-items-center">
                    <div className="col-md-4 my-5">
                        {isLoading ? (
                            <p>Đang tải thông tin phòng...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className='room-info'>
                                <img
                                    src={`data:image/png;base64,${roomInfo.photo}`}
                                    alt="Ảnh phòng"
                                    style={{ width: '100%', height: '200px' }}
                                />
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Kiểu phòng:</th>
                                            <td>{roomInfo.roomType}</td>
                                        </tr>
                                        <tr>
                                            <th>Giá phòng một đêm:</th>
                                            <td>{roomInfo.roomPrice}</td>
                                        </tr>
                                        <tr>
                                            <th>Dịch vụ phòng:</th>
                                            <td>
                                                <ul className='list-unstyled'>
                                                    <li><FaWifi /> WiFi</li>
                                                    <li><FaTv /> Netfilx Premium</li>
                                                    <li><FaUtensils /> Bữa sáng</li>
                                                    <li><FaWineGlassAlt /> Quầy bar mini</li>
                                                    <li><FaCar /> Dịch vụ ô tô</li>
                                                    <li><FaParking /> Không gian đỗ xe</li>
                                                    <li><FaTshirt /> Giặt là</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="col-md-8">
                        <BookingForm />
                    </div>
                </div>
            </section>
            <div className="container">
                <RoomCarousel />
            </div>
        </div>
    )
}

export default Checkout;
