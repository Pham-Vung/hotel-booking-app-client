import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});

/* This is function adds a new room to the database */
export const addRoom = async (photo, roomType, roomPrice) => {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/rooms/add/new-room", formData);

    return response.status === 201;
}

/* This is function gets all room types from the database */
export const getRoomTypes = async () => {
    try {
        const response = await api.get("/rooms/room/types");
        return response.data;
    } catch (error) {
        throw new Error("Lỗi, không thể xem được tất cả kiểu phòng");
    }
}

/* This is function gets all rooms from the database */
export const getAllRooms = async () => {
    try {
        const response = await api.get("/rooms/all-rooms");
        return response.data;
    } catch (error) {
        throw new Error("Lỗi, không xem được tất cả các phòng")
    }
}

/* This is function deletes a room by the Id */
export const deleteRoom = async (roomId) => {
    try {
        const response = await api.delete(`/rooms/delete/room/${roomId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Lỗi không xóa được phòng ${error.message}`);
    }
}

/* This is function update a room */
export const updateRoom = async (roomId, roomData) => {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);

    const response = await api.put(`/rooms/update/${roomId}`, formData);
    return response;
}

/* This funcction gets a room by the id */
export const getRoomById = async (roomId) => {
    try {
        const response = await api.get(`/rooms/room/${roomId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Lỗi không thể xem phòng ${error.message}`);
    }
}