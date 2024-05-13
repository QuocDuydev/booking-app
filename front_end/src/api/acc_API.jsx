import axios from "axios";

export const baseURL = "http://back-end.timtro.top/api";

export const getAccommodation = async () => {
	try {
		const response = await axios.get(`${baseURL}/accommodations/`);
		return response.data;
	} catch (error) {
		console.error("Error fetching Accommodation data:", error);
		throw error;
	}
};

export const getAccommodationdetail = async (accId) => {
	try {
		const response = await axios.get(`${baseURL}/accommodations/${accId}/`);
		return response.data;
	} catch (error) {
		console.error("Error fetching Accommodation detail data:", error);
		throw error;
	}
};
export const postAccommodation = async (token, formData) => {
	try {
		const response = await axios.post(`${baseURL}/accommodations/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error posting Accommodation data:", error);
		throw error;
	}
};
export const putAccommodation = async (token, formData, accId) => {
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
		console.error("Error putting Accommodation data:", error);
		throw error;
	}
};

export const deleteAccommodation = async (accId, token) => {
	try {
		const response = await axios.delete(`${baseURL}/accommodations/${accId}/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error deleting Accommodation:", error);
		throw error;
	}
};

// Process Image in Accommodations

export const getImageAcc = async (token, formData) => {
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
		console.error("Error posting Accommodation data:", error);
		throw error;
	}
};

export const postImageAcc = async (token, formData) => {
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
		console.error("Error posting Accommodation data:", error);
		throw error;
	}
};

export const deleteImageAcc = async (token, id) => {
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
		console.error("Error posting Accommodation data:", error);
		throw error;
	}
};

// Process Amenities in Rooms

export const getUtilities = async (token, formData) => {
	try {
		const response = await axios.get(
			`${baseURL}/accommodation-utilities/`,
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
		console.error("Error getting utilities data:", error);
		throw error;
	}
};

export const postUtilities = async (token, formData) => {
	try {
		const response = await axios.post(
			`${baseURL}/accommodation-utilities/`,
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
		console.error("Error post utilities data:", error);
		throw error;
	}
};

export const deleteUtilities = async (token, id) => {
	try {
		const response = await axios.delete(
			`${baseURL}/accommodation-utilities/${id}/`,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error delete utilities data:", error);
		throw error;
	}
};
