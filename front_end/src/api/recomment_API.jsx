import axios from 'axios';

const baseURL = 'http://localhost:8000/api';

export const getRecomment = async (hotelId) => {
    try {
        const response = await axios.get(`${baseURL}/hotels/${hotelId}/recomments`);
        return response.data;

    } catch (error) {
        console.error("Error fetching hotel data:", error);
        throw error;
    }
};
export const postRecomment = async (token,hotelId, recommentData) => {
    try {
        const formData = new FormData();
        Object.keys(recommentData).forEach(key => {
            formData.append(key, recommentData[key]);
        });

        const response = await axios.post(`${baseURL}/hotels/${hotelId}/recomments`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error posting recomment data:", error);
        throw error;
    }
};
