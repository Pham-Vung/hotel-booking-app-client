import React, { useEffect, useState } from 'react';
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

const EditRoom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });
    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { roomId } = useParams();

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setRoom({ ...room, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setRoom({ ...room, [name]: value })
    }

    const fetchRoom = async () => {
        try {
            const roomData = await getRoomById(roomId);
            setRoom(roomData);
            setImagePreview(roomData.photo);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await updateRoom(roomId, room);
            if (response.status === 200) {
                setSuccessMessage("Cập nhật thành công");
                const updatedRoomData = await getRoomById(roomId);
                setRoom(updatedRoomData);
                setImagePreview(updatedRoomData.photo);
                setErrorMessage("");
            } else {
                setErrorMessage("Lỗi không được cập nhật");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    }

    useEffect(() => {
        fetchRoom();
    }, [roomId]);

    return (
        <div className='container mt-5 mb-5'>
            <h3 className='text-center mb-5 mt-5'>Sửa thông tin phòng</h3>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                    {successMessage && (
                        <div className='alert alert-success fade show'>{successMessage}</div>
                    )}

                    {errorMessage && (
                        <div className='alert alert-danger fade show'>{errorMessage}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='roomType' className='form-label hotel-color'>
                                Kiểu phòng
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="roomType"
                                name="roomType"
                                value={room.roomType}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='roomPrice' className='form-label' style={{ color: "rgb(169, 77, 123)" }}>
                                Giá phòng
                            </label>
                            <input
                                type='number'
                                className='form-control'
                                required
                                id='roomPrice'
                                name='roomPrice'
                                value={room.roomPrice}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='photo' className='form-label' style={{ color: "rgb(169, 77, 123)" }}>
                                Ảnh phòng
                            </label>
                            <input
                                type='file'
                                id='photo'
                                name='photo'
                                className='form-control'
                                onChange={handleImageChange}
                            />
                            {
                                imagePreview && (
                                    <img
                                        src={`data:image/jpeg;base64,${imagePreview}`}
                                        alt="Ảnh xem trước"
                                        style={{
                                            maxWidth: "400px",
                                            maxHeight: "400px",
                                        }}
                                        className='mt-3'
                                    />
                                )
                            }
                        </div>

                        <div className='d-grid d-md-flex mt-2 gap-2'>
                            <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5'>Quay lại</Link>
                            <button className='btn btn-outline-warning' type='submit'>
                                Lưu chỉnh sửa
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditRoom;