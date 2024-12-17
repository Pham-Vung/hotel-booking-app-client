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
        throw new Error("Lỗi, không thể xem được tất cả các phòng");
    }
}