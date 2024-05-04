import axios from "axios";

const baseURL = "http://localhost:8000/api";

export const getAccType = async () => {
	try {
		const response = await axios.get(`${baseURL}/accommodation-types/`);
		return response.data;
	} catch (error) {
		console.error("Error fetching accommodation type data:", error);
		throw error;
	}
};

export const getAmenities = async () => {
	try {
		const response = await axios.get(`${baseURL}/amenities/`);
		return response.data;
	} catch (error) {
		console.error("Error fetching accommodation type data:", error);
		throw error;
	}
};
