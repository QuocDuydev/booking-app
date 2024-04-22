import axios from 'axios';

const baseURL = 'http://localhost:8000/api';

export const getRoom = async () => {
    try {
        const response = await axios.get(`${baseURL}/rooms/`);
        return response.data;

    } catch (error) {
        console.error("Error fetching room data:", error);
        throw error;
    }
};

export const getRoominHotel = async (hotelId) => {
    try {
        const response = await axios.get(`${baseURL}/hotels/${hotelId}/rooms/`);
        return response.data;

    } catch (error) {
        console.error("Error fetching room in hotel data:", error);
        throw error;
    }
};

export const getRoomdetailinHotel = async (hotelId, roomId) => {
    try {
        const response = await axios.get(`${baseURL}/hotels/${hotelId}/rooms/${roomId}`);
        return response.data;

    } catch (error) {
        console.error("Error fetching room detail data:", error);
        throw error;
    }
};
export const postRoom = async ( token, roomData) => {
    try {
        const formData = new FormData();
        Object.keys(roomData).forEach(key => {
            formData.append(key, roomData[key]);
        });

        const response = await axios.post(`${baseURL}/rooms/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error posting hotel data:", error);
        throw error;
    }
};

export const putRoom = async (roomId, token, roomData) => {
    try {
        const formData = new FormData();
        Object.keys(roomData).forEach(key => {
            formData.append(key, roomData[key]);
        });

        const response = await axios.put(`${baseURL}/rooms/${roomId}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error putting room data:", error);
        throw error;
    }
};


export const deleteRoominHotel = async (roomId) => {
    try {
        const response = await axios.delete(`${baseURL}/rooms/${roomId}/`);
        return response.data;
    } catch (error) {
        console.error("Error deleting rooms:", error);
        throw error;
    }
};
