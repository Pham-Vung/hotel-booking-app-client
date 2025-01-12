import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const getHeader = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

/* This is function adds a new room to the database */
export const addRoom = async (photo, roomType, roomPrice) => {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/rooms/add/new-room", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
        }
    });

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
        const response = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers: getHeader()
        });
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

    const response = await api.put(`/rooms/update/${roomId}`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
        }
    });
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

/* This is function get available rooms from the database within a give date and room type */
export const getAvailableRooms = async (checkInDate, checkOutDate, roomType) => {
    const response = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`);
    return response;
}

/* This is function save a new booking to database */
export const bookRoom = async (roomId, booking) => {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Lỗi đặt phòng: ${error.message}`);
        }

    }
}

/* This is function gets all bookings from the database */
export const getAllBookings = async () => {
    try {
        const response = await api.get("/bookings/all-bookings", {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw new Error(`Lỗi lấy ra các lịch đặt: ${error.message}`);
    }
}

/* This is function get booking by the confirmation code  */
export const getBookingByComfirmationCode = async (confirmationCode) => {
    try {
        const response = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Lỗi tìm đặt phòng: ${error.message}`);
        }
    }
}

/* This is function cacel booking */
export const cancelBooking = async (bookingId) => {
    try {
        const response = await api.delete(`/bookings/booking/${bookingId}/delete`);
        return response.data;
    } catch (error) {
        throw new Error(`Lỗi xóa lịch đặt: ${error.message}`);
    }
}

export const getBookingsByUserId = async (userId) => {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy ra các lịch đặt phòng: " + error.message);
        throw new Error("Không lấy ra được lịch đặt phòng");
    }
}

export const registerUser = async (registration) => {
    try {
        const response = await api.post("/auth/register-user", registration);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        }
        throw new Error(`Lỗi đăng ký người dùng: ${error.message}`);
    }
}

export const loginUser = async (login) => {
    try {
        const response = await api.post("/auth/login", login);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getUserProfile = async (userId) => {
    try {
        const response = await api.get(`/users/profile/${userId}`, {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUser = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        return error.message;
    }
}