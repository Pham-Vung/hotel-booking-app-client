import React, { useEffect, useState } from 'react';
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import { Col, Row } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8); // số phòng trên mỗi trang
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const result = await getAllRooms();
            setRooms(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    }

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleDelte = async (roomId) => {
        try {
            const result = await deleteRoom(roomId);
            if (result === "") {
                setSuccessMessage(`Phòng ${roomId} đã được xóa`);
                fetchRooms();
            } else {
                console.error(`Lỗi không xóa được phòng: ${result.message}`);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000)
    }

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    useEffect(() => {
        fetchRooms();
    }, []);

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter(room => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }, [rooms, setSelectedRoomType]);

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>

            {
                isLoading ? (
                    <p>Đang tải các phòng hiện có...</p>
                ) : (
                    <>
                        <section className='mt-5 mb-5 container'>
                            <div className='d-flex justify-content-between mb-3 mt-5'>
                                <h2>Các phòng hiện có</h2>
                            </div>
                            <Row>
                                <Col md={6} className='mb-3 mb-md-0'>
                                    <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                                </Col>

                                <Col md={6} className='d-flex justify-content-end'>
                                    <Link to={"/add-room"}>
                                        <FaPlus /> Thêm phòng mới
                                    </Link>
                                </Col>
                            </Row>

                            <table className='table table-bordered table-hover'>
                                <thead>
                                    <tr className='text-center'>
                                        <th>ID</th>
                                        <th>Kiểu phòng</th>
                                        <th>Giá phòng</th>
                                        <th>Khác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentRooms.map(room => (
                                            <tr key={room.id} className='text-center'>
                                                <td>{room.id}</td>
                                                <td>{room.roomType}</td>
                                                <td>{room.roomPrice}</td>
                                                <td className='gap-2'>
                                                    <Link to={`/edit-room/${room.id}`}>
                                                        <span className='btn btn-info btn-sm'><FaEye /> Xem</span>
                                                        <span className='btn btn-warning btn-sm ml-5'><FaEdit /> Sửa</span>
                                                    </Link>
                                                    <button
                                                        className='btn btn-danger btn-sm ml-5'
                                                        onClick={() => handleDelte(room.id)}
                                                    >
                                                        <FaTrashAlt />
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <RoomPaginator
                                currentPage={currentPage}
                                totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                                onPageChange={handlePaginationClick}
                            />
                        </section>
                    </>
                )
            }
        </>
    )
}

export default ExistingRooms;