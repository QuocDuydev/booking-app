import axios from "axios";

const baseURL = "http://localhost:8000/api";

export const getRoom = async () => {
	try {
		const response = await axios.get(`${baseURL}/rooms/`);
		return response.data;
	} catch (error) {
		console.error("Error fetching room data:", error);
		throw error;
	}
};

export const getRoominHotel = async (accId) => {
	try {
		const response = await axios.get(
			`${baseURL}/accommodations/${accId}/rooms/`,
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching room in hotel data:", error);
		throw error;
	}
};

export const getRoomdetailinHotel = async (accId, roomId) => {
	try {
		const response = await axios.get(
			`${baseURL}/accommodations/${accId}/rooms/${roomId}`,
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching room detail data:", error);
		throw error;
	}
};
export const postRoom = async (token, formData) => {
	try {
		const response = await axios.post(`${baseURL}/rooms/`, formData, {
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

export const putRoom = async (roomId, token, formData) => {
	try {
		const response = await axios.put(`${baseURL}/rooms/${roomId}/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
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

// Process Image in Rooms

export const getImage = async (token, formData) => {
	try {
		const response = await axios.get(`${baseURL}/room-images/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error getting images data:", error);
		throw error;
	}
};

export const postImage = async (token, formData) => {
	try {
		const response = await axios.post(`${baseURL}/room-images/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error post images data:", error);
		throw error;
	}
};

export const deleteImage = async (token, id) => {
	try {
		const response = await axios.delete(`${baseURL}/room-images/${id}/`, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error delete images data:", error);
		throw error;
	}
};

// Process Amenities in Rooms

export const getAmenities = async (token, formData) => {
	try {
		const response = await axios.get(`${baseURL}/room-amenities/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error getting images data:", error);
		throw error;
	}
};

export const postAmenities = async (token, formData) => {
	try {
		const response = await axios.post(`${baseURL}/room-amenities/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error post images data:", error);
		throw error;
	}
};

export const deleteAmenities = async (token, id) => {
	try {
		const response = await axios.delete(`${baseURL}/room-amenities/${id}/`, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error delete images data:", error);
		throw error;
	}
};
