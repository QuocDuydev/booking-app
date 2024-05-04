import axios from "axios";

export const baseURL = "http://localhost:8000/api";

export const getHotel = async () => {
	try {
		const response = await axios.get(`${baseURL}/accommodations/`);
		return response.data;
	} catch (error) {
		console.error("Error fetching hotel data:", error);
		throw error;
	}
};

export const getHoteldetail = async (hotelId) => {
	try {
		const response = await axios.get(`${baseURL}/accommodations/${hotelId}/`);
		return response.data;
	} catch (error) {
		console.error("Error fetching hotel detail data:", error);
		throw error;
	}
};
export const postHotel = async (token, formData) => {
	try {
		const response = await axios.post(`${baseURL}/accommodations/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error posting hotel data:", error);
		throw error;
	}
};
export const putHotel = async (token, formData, accId) => {
	try {
		const response = await axios.put(
			`${baseURL}/accommodations/${accId}/`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error putting hotel data:", error);
		throw error;
	}
};

export const deleteHotel = async (accId, token) => {
	try {
		const response = await axios.delete(`${baseURL}/accommodations/${accId}/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error deleting hotel:", error);
		throw error;
	}
};

// Process Image in Accommodations

export const getImage = async (token, formData) => {
	try {
		const response = await axios.get(
			`${baseURL}/accommodation-images/`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error posting hotel data:", error);
		throw error;
	}
};

export const postImage = async (token, formData) => {
	try {
		const response = await axios.post(
			`${baseURL}/accommodation-images/`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error posting hotel data:", error);
		throw error;
	}
};

export const deleteImage = async (token, id) => {
	try {
		const response = await axios.delete(
			`${baseURL}/accommodation-images/${id}`,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error posting hotel data:", error);
		throw error;
	}
};
