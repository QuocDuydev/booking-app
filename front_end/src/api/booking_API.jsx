import axios from "axios";

const baseURL = "http://back-end.timtro.top/api";

export const getlistBooking = async (token) => {
	try {
		const response = await axios.get(`${baseURL}/bookings/`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching booking data:", error);
		throw error;
	}
};
export const getBookingbyuserid = async (token) => {
	try {
		const response = await axios.get(`${baseURL}/list-booking/`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching booking data:", error);
		throw error;
	}
};

export const getBookingId = async (bookingId, token) => {
	try {
		const response = await axios.get(`${baseURL}/bookings/${bookingId}/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching booking data:", error);
		throw error;
	}
};

export const postBooking = async (token, bookingData) => {
	try {
		const response = await axios.post(`${baseURL}/bookings/`, bookingData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error posting booking data:", error);
		throw error;
	}
};

export const putBooking = async (bookingId, token, bookingData) => {
	try {
		const response = await axios.put(
			`${baseURL}/bookings/${bookingId}/`,
			bookingData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error putting booking data:", error);
		throw error;
	}
};
const st = "hide";
export const patchBooking = async (bookingId, token) => {
	try {
		const response = await axios.patch(
			`${baseURL}/bookings/${bookingId}/`,
			{ status: st },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error patch booking:", error);
		throw error;
	}
};

export const deleteBooking = async (bookingId, token) => {
	try {
		const response = await axios.delete(`${baseURL}/bookings/${bookingId}/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error deleting booking:", error);
		throw error;
	}
};
