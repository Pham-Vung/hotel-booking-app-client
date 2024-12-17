import React, { useEffect, useState } from 'react';
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState("");

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypeInput(false);
        }
    }

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        })
    }, []);


    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select
                        required
                        className='form-select'
                        name="roomType"
                        value={newRoom.roomType}
                        onChange={(e) => {
                            if (e.target.value === "Thêm mới") {
                                setShowNewRoomTypeInput(true);
                            } else {
                                handleRoomInputChange(e);
                            }
                        }}
                    >
                        <option value="">Lựa chọn kiểu phòng</option>
                        <option value={"Thêm mới"}>Thêm mới</option>
                        {
                            roomTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))
                        }

                    </select>
                    {showNewRoomTypeInput && (
                        <div className='mt-2'>
                            <div className='input-group'>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Nhập kiểu phòng'
                                    value={newRoomType}
                                    onChange={handleNewRoomTypeInputChange}
                                />
                                <button
                                    className='btn btn-info'
                                    type='button'
                                    onClick={handleAddNewRoomType}
                                >
                                    Thêm
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default RoomTypeSelector;
